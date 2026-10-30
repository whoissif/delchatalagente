"""Skill propuesta-reposicion: artículos bajo stock mínimo con su proveedor.

Cálculo determinista: el agente no debe rehacerlo a mano. No contacta con nadie.
Uso: python .opencode/skills/propuesta-reposicion/scripts/bajo_minimo.py \
        --inventario inventario_material.csv --proveedores contactos_proveedores.csv
"""
import argparse
import csv
import sys

sys.stdout.reconfigure(encoding="utf-8")
p = argparse.ArgumentParser()
p.add_argument("--inventario", default="inventario_material.csv")
p.add_argument("--proveedores", default="contactos_proveedores.csv")
p.add_argument("--margen", type=int, default=10, help="margen sobre el mínimo por debajo del cual se vigila")
args = p.parse_args()

with open(args.inventario, encoding="utf-8") as f:
    inventario = list(csv.DictReader(f))
with open(args.proveedores, encoding="utf-8") as f:
    proveedores = {fila["codigo"]: fila for fila in csv.DictReader(f)}

bajo, vigilar = [], []
for art in inventario:
    existencias, minimo = int(art["existencias"]), int(art["stock_minimo"])
    prov = proveedores.get(art["proveedor"], {})
    fila = (art["codigo"], art["descripcion"], existencias, minimo, art["proveedor"],
            prov.get("empresa_ficticia", "¿desconocido?"), prov.get("plazo_suministro_dias_laborables", "?"),
            prov.get("plazo_respuesta_horas", "?"))
    if existencias < minimo:
        bajo.append(fila)
    elif existencias - minimo <= args.margen:
        vigilar.append(fila)

print("## Artículos por debajo del stock mínimo\n")
print("| Código | Descripción | Existencias | Mínimo | Déficit | Proveedor | Plazo (días lab.) | Respuesta (h) |")
print("|---|---|---|---|---|---|---|---|")
for c, d, e, m, pc, pn, plazo, resp in bajo:
    print(f"| {c} | {d} | {e} | {m} | **{m - e}** | {pc} {pn} | {plazo} | {resp} |")
print(f"\nArtículos bajo mínimo: **{len(bajo)} de {len(inventario)}**.")
print(f"\n## A vigilar (margen de {args.margen} o menos)\n")
print("| Código | Descripción | Existencias | Mínimo | Margen |")
print("|---|---|---|---|---|")
for c, d, e, m, *_ in vigilar:
    print(f"| {c} | {d} | {e} | {m} | {e - m} |")
