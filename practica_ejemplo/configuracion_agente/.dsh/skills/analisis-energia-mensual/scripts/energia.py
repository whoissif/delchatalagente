"""Skill analisis-energia-mensual: consumo eléctrico diario frente a producción.

Lee el CSV SIN modificarlo; las correcciones se hacen en memoria y se listan.
Uso: python .dsh/skills/analisis-energia-mensual/scripts/energia.py         --datos lecturas_energia_diarias.csv --total 32400 --unidades 17820 --salida analisis
"""
import argparse
import csv
import sys
from pathlib import Path

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

sys.stdout.reconfigure(encoding="utf-8")
p = argparse.ArgumentParser()
p.add_argument("--datos", default="lecturas_energia_diarias.csv")
p.add_argument("--total", type=float, help="kWh totales según el informe, para el total de control")
p.add_argument("--unidades", type=int, help="unidades según el informe, para el total de control")
p.add_argument("--salida", default="analisis", help="carpeta donde guardar el gráfico")
args = p.parse_args()
DATOS = Path(args.datos)
CARPETA = Path(args.salida)
CARPETA.mkdir(exist_ok=True)
TOTAL_INFORME_KWH = args.total
UNIDADES_INFORME = args.unidades
UMBRAL_MWH = 10                 # un día con < 10 "kWh" es imposible: se interpreta como MWh

# ---------------------------------------------------------------- 1. leer
with open(DATOS, encoding="utf-8") as f:
    filas = list(csv.DictReader(f))
print(f"Filas leídas: {len(filas)} · columnas: {list(filas[0].keys())}")

# ---------------------------------------------------------------- 2. revisar y corregir (en memoria)
correcciones = []
for fila in filas:
    for col, valor in fila.items():
        if valor.strip() == "":
            correcciones.append(f"{fila['fecha']}: '{col}' vacío -> se deja sin valor (no se usa en el modelo)")
    kwh = float(fila["kwh_total"])
    if kwh < UMBRAL_MWH:
        correcciones.append(f"{fila['fecha']}: kwh_total = {kwh} parece MWh -> {kwh * 1000:.0f} kWh")
        kwh *= 1000
    fila["kwh"] = kwh
print("\nCorrecciones y avisos:")
for c in correcciones:
    print("  -", c)

semana = np.array([int(f["semana"]) for f in filas])
unidades = np.array([int(f["unidades_terminadas"]) for f in filas])
kwh = np.array([f["kwh"] for f in filas])
nocturno = np.array([int(f["kwh_nocturno"]) for f in filas])

# ---------------------------------------------------------------- 3. totales
print("\nTotales por semana (kWh · kWh nocturnos · media nocturna diaria):")
for s in range(1, 5):
    m = semana == s
    print(f"  Semana {s}: {kwh[m].sum():7,.0f} · {nocturno[m].sum():5,.0f} · {nocturno[m].mean():5.1f}")
total_crudo = sum(float(f["kwh_total"]) for f in filas)
print(f"\nTotal SIN corregir: {total_crudo:,.3f} kWh")
print(f"Total corregido:    {kwh.sum():,.0f} kWh  (informe: {TOTAL_INFORME_KWH or 'no indicado'})")
print(f"Unidades:           {unidades.sum():,}  (informe: {UNIDADES_INFORME or 'no indicado'})")
print(f"kWh por unidad:     {kwh.sum() / unidades.sum():.2f}")
if TOTAL_INFORME_KWH:
    print("TOTAL DE CONTROL:", "CUADRA" if abs(kwh.sum() - TOTAL_INFORME_KWH) < 1 else "NO CUADRA: revisar antes de seguir")

# ---------------------------------------------------------------- 4. modelo: kWh = a + b * unidades
def ajustar(m):
    b, a = np.polyfit(unidades[m], kwh[m], 1)
    return a, b

def r2(y, pred):
    return 1 - ((y - pred) ** 2).sum() / ((y - y.mean()) ** 2).sum()

todos = np.ones(len(kwh), bool)
a, b = ajustar(todos)
print(f"\nModelo con los 28 días:      kWh = {a:.0f} + {b:.3f} x unidades  (R2 = {r2(kwh, a + b * unidades):.3f})")
a2, b2 = ajustar(semana != 3)
print(f"Modelo sin la semana 3:      kWh = {a2:.0f} + {b2:.3f} x unidades")

# Comprobación honesta: ajustar con 3 semanas y evaluar en la que queda fuera.
print("\nValidación dejando una semana fuera (error medio absoluto en la semana excluida):")
for s in range(1, 5):
    aa, bb = ajustar(semana != s)
    m = semana == s
    print(f"  Semana {s} fuera: {np.abs(kwh[m] - (aa + bb * unidades[m])).mean():6.1f} kWh/día")

# Referencia sencilla: ¿mejora el modelo a «media según tipo de día»?
tipo = np.where(unidades == 0, 0, np.where(unidades < 500, 1, 2))
ref = np.array([kwh[tipo == t].mean() for t in tipo])
print(f"\nR2 del modelo lineal: {r2(kwh, a + b * unidades):.3f} · R2 de la referencia por tipo de día: {r2(kwh, ref):.3f}")

print(f"\nRango de validez: {unidades.min()} a {unidades.max()} unidades/día. Fuera de ahí, el modelo no sabe nada.")

print("\nExceso de cada semana sobre lo que el modelo predice por su producción:")
for nombre, (aa, bb) in {"28 días": (a, b), "sin semana 3": (a2, b2)}.items():
    exceso = [(kwh[semana == s] - (aa + bb * unidades[semana == s])).sum() for s in range(1, 5)]
    print(f"  Recta {nombre:13}: " + " · ".join(f"S{s}: {e:+5.0f}" for s, e in zip(range(1, 5), exceso)))

# ---------------------------------------------------------------- 5. gráfico
fig, (g1, g2) = plt.subplots(1, 2, figsize=(11, 4.5))
colores = {1: "#1f77b4", 2: "#2ca02c", 3: "#d62728", 4: "#9467bd"}
for s in range(1, 5):
    m = semana == s
    g1.scatter(unidades[m], kwh[m], color=colores[s], label=f"Semana {s}", s=35)
x = np.linspace(0, unidades.max(), 50)
g1.plot(x, a2 + b2 * x, "k--", lw=1, label="Modelo (sin semana 3)")
g1.set(xlabel="Unidades terminadas al día", ylabel="kWh al día", title="Consumo frente a producción")
g1.legend(fontsize=8)
g2.bar([f"S{s}" for s in range(1, 5)], [nocturno[semana == s].mean() for s in range(1, 5)],
       color=[colores[s] for s in range(1, 5)])
g2.set(ylabel="kWh nocturnos (media diaria)", title="Consumo nocturno por semana")
fig.tight_layout()
salida = CARPETA / "energia.png"
fig.savefig(salida, dpi=120)
print(f"\nGráfico guardado en {salida.name}")
