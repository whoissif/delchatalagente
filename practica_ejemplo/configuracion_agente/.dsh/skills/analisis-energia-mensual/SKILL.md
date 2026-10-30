---
name: analisis-energia-mensual
description: Analiza el consumo eléctrico diario frente a la producción (CSV de lecturas de energía), corrige unidades, cuadra totales con el informe y ajusta un modelo lineal. Úsala cuando pidan el análisis de energía del mes, el consumo por unidad o qué semana consume de más.
---

# Análisis de energía mensual

1. **Antes de calcular**, di cuántas filas y columnas tiene el CSV, en qué unidades está cada columna y qué valores vacíos o raros ves.
2. Busca en el informe de energía del mes el consumo total (kWh) y las unidades producidas, para el total de control.
3. Ejecuta el script (no reescribas el cálculo a mano):
   `python .dsh/skills/analisis-energia-mensual/scripts/energia.py --datos <csv> --total <kWh del informe> --unidades <unidades del informe> --salida analisis`
4. Si el script dice **NO CUADRA**, para y explícalo antes de sacar conclusiones.
5. Informa en este orden:
   - correcciones que ha hecho el script y por qué;
   - totales y si cuadran con el informe;
   - modelo (con qué datos se ajustó, R² frente a la referencia por tipo de día, rango de validez);
   - qué semana se sale y **qué dato lo confirma**.
6. Separa **hechos** (lo que dicen los datos) de **hipótesis** (posibles causas). No afirmes causas.
7. No modifiques el CSV original. El gráfico queda en `analisis/energia.png`.
