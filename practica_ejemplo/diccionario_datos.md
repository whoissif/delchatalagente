# Diccionario de datos

Qué significa cada columna de los tres CSV de esta carpeta, en qué unidad está y qué valores son normales. Los tres están en **UTF-8** (con tildes y eñes). Si al abrirlos ves caracteres raros, como `AlmacÃ©n`, es tu programa el que los lee con otra codificación: en Excel, ábrelos con **Datos → Desde texto/CSV** y elige *65001: Unicode (UTF-8)*. No culpes al agente antes de comprobarlo.

Todos los datos son ficticios.

## `inventario_material.csv`

Una fila por componente del almacén.

| Columna | Significado | Unidad | Valores normales |
|---|---|---|---|
| `codigo` | Código interno del componente | — | Letra, guion y número (`J-18`) |
| `descripcion` | Nombre del componente | — | Texto |
| `existencias` | Cantidad en almacén hoy | La de la columna `unidad` | Número entero, 0 o más |
| `stock_minimo` | Cantidad por debajo de la cual hay que reponer | La de la columna `unidad` | Número entero, mayor que 0 |
| `unidad` | Unidad en que se cuentan existencias y mínimo | — | `unidades` o `cartuchos` |
| `ubicacion` | Almacén donde está | — | Texto |
| `proveedor` | Código del proveedor asignado | — | Un `codigo` de `contactos_proveedores.csv` (`V-101`…`V-104`) |

Un artículo está **bajo mínimo** cuando `existencias` es menor que `stock_minimo`.

## `contactos_proveedores.csv`

Una fila por proveedor. Se cruza con el inventario por la columna `codigo` (en el inventario se llama `proveedor`).

| Columna | Significado | Unidad | Valores normales |
|---|---|---|---|
| `codigo` | Código del proveedor | — | `V-` y tres cifras |
| `empresa_ficticia` | Nombre de la empresa | — | Texto |
| `correo` | Correo de contacto (dominio reservado, no existe) | — | `...@...ejemplo.test` |
| `especialidad` | Qué suministra | — | Texto |
| `plazo_respuesta_horas` | Tiempo en contestar a una consulta | horas | 12 a 72 |
| `plazo_suministro_dias_laborables` | Tiempo en entregar un pedido | días laborables | 5 a 15 |
| `observaciones` | Notas | — | Texto |

## `lecturas_energia_diarias.csv`

Una fila por día del 1 al 28 de mayo de 2025: las cuatro semanas del informe `informes/informe_04_energia_mayo.txt`.

| Columna | Significado | Unidad | Valores normales |
|---|---|---|---|
| `fecha` | Día de la lectura | AAAA-MM-DD | Del 2025-05-01 al 2025-05-28 |
| `semana` | Semana del informe | — | 1 a 4 |
| `unidades_terminadas` | Bombas terminadas ese día | unidades | Unos 300 a 900 en días con producción; 0 en domingo |
| `horas_operacion` | Horas que trabajó la línea | horas | Hasta 16 (dos turnos); 0 en domingo |
| `kwh_total` | Consumo eléctrico de todo el día | **kWh** | Unos 750 a 1.550 en días con producción; unos 250 a 400 en domingo |
| `kwh_nocturno` | Parte del consumo de la noche (planta parada) | kWh | Unos 90 a 170 |

Un valor fuera de estos rangos no es necesariamente un error, pero hay que mirarlo **antes** de calcular: puede ser una lectura en otra unidad o un dato que falta.
