# Análisis del "Menú Semanal Saludable" (objetivo: ~1.590 kcal y 90 g de proteína)

> Estimaciones con tablas de composición estándar. Son aproximadas: un
> nutricionista presencial puede afinarlas con los datos reales de la persona.
> Cálculo reproducible en `calculo_menu.py`.

## Supuestos usados
- Carnes y pescados pesados **en crudo**; carne molida 10 % grasa; salmón de cultivo.
- Fideos, quinoa, lentejas y garbanzos pesados **cocidos**; patatas cocidas/asadas sin aceite.
- "Tostadas integrales" = pan integral (≈250 kcal/100 g), café con leche semidescremada.
- Yogur alto en proteína ≈ 95 kcal y 15 g de proteína por 150 g.
- **No incluye el aceite de oliva** (el plan permite hasta 4 cdtas/día ≈ 160 kcal).

## Resultado por día (sin aceite)

| Día        | kcal | Proteína | Carbos | Grasa |
|------------|-----:|---------:|-------:|------:|
| Lunes      | 1.458 | 114 g | 176 g | 36 g |
| Martes     | 1.442 | 112 g | 135 g | 52 g |
| Miércoles  | 1.289 | 109 g | 151 g | 28 g |
| Jueves     | 1.304 | 106 g | 124 g | 43 g |
| Viernes    | 1.374 | 104 g | 148 g | 41 g |
| Sábado     | 1.368 | 105 g | 176 g | 27 g |
| Domingo    | 1.480 | 111 g | 141 g | 52 g |
| **Promedio** | **≈1.390** | **≈109 g** | **≈150 g** | **≈40 g** |

**Con 3–4 cdtas de aceite (+120–160 kcal) el promedio queda en ≈1.510–1.550 kcal**,
muy cerca de las 1.590 kcal declaradas. 

## Conclusión
- **Las calorías cuadran** con lo que dice el plan (si se usa el aceite indicado).
- **La proteína real (~105–115 g) supera los 90 g**, lo que es bueno para bajar grasa.
- Si ella es mujer, ~55–70 kg y entrena 3–5 veces por semana, su gasto suele
  estar en ~1.900–2.200 kcal → 1.590 kcal es un déficit moderado (≈0,3–0,5 kg/semana).
  Es un objetivo razonable, **pero hay que validarlo con su peso, estatura, edad y actividad**.

## Lo que está bien
- Proteína en casi todas las comidas, verduras abundantes, carbohidratos complejos.
- Salmón 2 veces/semana (omega-3), legumbres 2 veces, fruta diaria.
- Merienda a las 17 h con carbohidrato + proteína: buen pre-entreno.
- Creatina 5 g/día y 2,5 L de agua: correcto.

## Ajustes recomendados (priorizados)
1. **Aclarar crudo vs. cocido.** Es el mayor riesgo de error: 150 g de fideos
   *en crudo* son ~525 kcal (vs ~225 cocidos). Lo mismo con quinoa y legumbres.
   Recomendado: pesar en cocido como asumí aquí.
2. **Medir el aceite con cuchara**, no "a ojo". Un chorrito puede ser 2–3 cdas (+250–350 kcal).
3. **Meriendas sin proteína (martes y domingo):** ½ plátano + frutos secos aporta
   ~2 g de proteína. Añadir un yogur proteico o 100 g de cottage.
4. **Comida del sábado (garbanzos):** solo ~18 g de proteína. Sumar 1–2 huevos,
   una lata de atún o 100 g de pollo.
5. **Post-entreno:** si entrena hasta las 20 h, la cena (20–21 h) es su comida
   post-entreno; mantenerla con ≥30 g de proteína (el jueves la tortilla de 2
   huevos queda justa → usar 3 huevos o 2 huevos + claras).
6. **Calorías bajas en días de entrenamiento intenso:** miércoles y jueves salen
   ~1.300 kcal. Si tiene mucha hambre o baja el rendimiento, añadir 30 g de pan o
   ½ taza de arroz/quinoa en la comida.
7. **Micronutrientes:** revisar hierro (si menstrúa; acompañar lentejas/espinacas
   con vitamina C), calcio (~1.000 mg/día: 2–3 lácteos) y vitamina D.
8. **Variedad del snack:** el yogur todos los días está bien, pero puede alternar con
   queso + fruta o un batido de proteína para no aburrirse.
9. **Monitoreo:** pesarse 3–4 mañanas por semana y mirar el promedio semanal, más
   cintura cada 2 semanas. Si en 3 semanas no baja, reducir 100–150 kcal o subir
   pasos diarios; si baja >1 % por semana, subir un poco las calorías.

## Datos que faltan para validar el objetivo
Edad, peso, estatura, % grasa (si lo tiene), días/tipo de entrenamiento, pasos
diarios, condiciones de salud y ciclo menstrual. Con eso el agente
`nutricionista-perdida-grasa` puede recalcular su gasto y confirmar si 1.590 kcal
y la proteína son las adecuadas.
