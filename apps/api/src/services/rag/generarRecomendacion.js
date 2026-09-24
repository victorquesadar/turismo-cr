import { generar } from './geminiClient.js';

/**
 * Genera la respuesta conversacional a partir de los sitios recuperados
 * (RF-43, RF-44, RF-50).
 *
 * La instruccion es estricta: el modelo solo puede recomendar los sitios
 * que se le entregan. Si la lista esta vacia, debe decirlo sin inventar.
 *
 * El prompt busca respuestas concisas pero contextualizadas: aunque la
 * consulta tenga muchos matices (dias, ninos, presupuesto), la respuesta
 * se mantiene breve pero refleja que se entendieron esos matices.
 */
export async function generarRecomendacion(mensaje, sitios) {
  if (sitios.length === 0) {
    // RF-50: sin resultados, se informa sin inventar alternativas.
    return {
      texto:
        'No encontré lugares en nuestro catálogo que coincidan exactamente con lo que buscás. ' +
        'Probá ampliar los criterios: por ejemplo, otra provincia, otro tipo de actividad o un presupuesto distinto.',
      sitios: [],
    };
  }

  const catalogoTexto = sitios
    .map(
      (s, i) =>
        `${i + 1}. ${s.nombre} (${s.provincia?.nombre ?? ''}, ${s.categoria?.nombre ?? ''})` +
        `${s.es_accesible ? ' [accesible]' : ''}${s.es_poco_conocido ? ' [poco conocido]' : ''}: ${s.descripcion}`
    )
    .join('\n');

  const prompt = `Sos un asistente turistico especializado en Costa Rica. Una persona te escribio: "${mensaje}"

Estos son los UNICOS lugares que podes recomendar (vienen de nuestra base de datos verificada):

${catalogoTexto}

Reglas estrictas:
- Solo podes mencionar lugares de la lista anterior. NO inventes, NO agregues otros lugares.
- NO inventes datos (horarios, precios, servicios, distancias) que no esten en las descripciones.
- Escribi en espanol conversacional y calido, en parrafos naturales (sin markdown, sin listas, sin viñetas).

Estilo de la respuesta (IMPORTANTE: breve y directa):
- Recomenda entre 2 y 4 lugares, no mas.
- Cada lugar en una o dos frases cortas.
- Si la persona menciona un matiz especifico (ninos, pareja, dias, presupuesto, accesibilidad, epoca del año, adultos mayores), tenlo EN CUENTA al elegir los lugares y menciona brevemente por que encajan. NO agregues parrafos explicativos largos.
- Ejemplos de menciones breves apropiadas:
   * Con niños: "ideal para tus hijos por [razon en pocas palabras]"
   * Accesibilidad: "es accesible para silla de ruedas"
   * Varios dias: puedes ordenar las recomendaciones en secuencia sin explicar cada dia
   * Presupuesto ajustado: "opcion economica"
- Si hay lugares [poco conocido], destacalos brevemente como "una joya poco conocida".
- Cerrá con UNA sola frase invitando a preguntar mas si lo necesita.

Objetivo: respuesta corta pero que demuestre que entendiste el contexto. NO explicaciones largas.

Redacta la respuesta ahora.`;

  const texto = await generar(prompt);

  // Se devuelven tambien los sitios para que el frontend muestre enlaces (RF-44).
  return {
    texto: texto.trim(),
    sitios: sitios.map((s) => ({
      id: s.id,
      nombre: s.nombre,
      provincia: s.provincia?.nombre ?? '',
    })),
  };
}