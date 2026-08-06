import { generar } from './geminiClient.js';

/**
 * Genera la respuesta conversacional a partir de los sitios recuperados
 * (RF-43, RF-44, RF-50).
 *
 * La instruccion es estricta: el modelo solo puede recomendar los sitios
 * que se le entregan. Si la lista esta vacia, debe decirlo sin inventar.
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

  const prompt = `Sos un asistente turistico de Costa Rica. Una persona escribio: "${mensaje}"

Estos son los UNICOS lugares que podes recomendar (vienen de nuestra base de datos verificada):

${catalogoTexto}

Redacta una respuesta breve y amable en espanol que recomiende entre 2 y 4 de estos lugares, explicando por que encajan con lo que la persona busca. Reglas estrictas:
- Solo podes mencionar lugares de la lista anterior. No inventes ni agregues otros.
- No inventes datos que no esten en las descripciones.
- Se conversacional pero conciso.
- No uses formato markdown ni listas numeradas, escribi en parrafos naturales.`;

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
