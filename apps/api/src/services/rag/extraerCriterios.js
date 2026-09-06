import { generar } from './geminiClient.js';

/**
 * Extrae los criterios de seleccion del mensaje del usuario (RF-40).
 *
 * Se le pide al modelo que devuelva SOLO un JSON con los criterios
 * detectados. Esto convierte lenguaje natural en filtros estructurados
 * que luego se aplican sobre la base de datos.
 */
const PROVINCIAS_VALIDAS = [
  'san-jose', 'alajuela', 'cartago', 'heredia', 'guanacaste', 'puntarenas', 'limon',
];
const ACTIVIDADES_VALIDAS = ['deporte', 'aire-libre', 'cultura', 'gastronomia', 'bienestar'];
const PRESUPUESTOS_VALIDOS = ['bajo', 'medio', 'alto'];

export async function extraerCriterios(mensaje) {
  const prompt = `Sos un extractor de criterios para un buscador de sitios turisticos de Costa Rica. Analiza el mensaje y extrae SOLO los criterios que la persona menciona de forma EXPLICITA y CLARA.

Mensaje: "${mensaje}"

Reglas de extraccion:
- provincia: solo si la persona nombra una provincia de Costa Rica de forma explicita. Guia: playa/mar en el Pacifico norte suele ser guanacaste o puntarenas, pero NO asumas si no lo dicen.
- actividad: elegi UNA sola si es evidente. Guia de categorias: "deporte" (surf, senderismo, aventura), "aire-libre" (playas, volcanes, naturaleza, parques), "cultura" (museos, teatros, historia), "gastronomia" (comida, mercados), "bienestar" (termales, spa, descanso).
- presupuesto: solo si mencionan explicitamente barato/economico (bajo), moderado (medio) o lujo/caro (alto).
- accesible: true solo si mencionan silla de ruedas, movilidad reducida o accesibilidad.

IMPORTANTE: ante la MENOR duda sobre un criterio, ponelo en null. Es mejor extraer pocos criterios y encontrar mas lugares, que extraer demasiados y no encontrar nada. NO inventes criterios que no esten claros en el mensaje.

Devuelve UNICAMENTE un objeto JSON valido, sin texto adicional ni markdown:
{
  "provincia": null o uno de [${PROVINCIAS_VALIDAS.join(', ')}],
  "actividad": null o uno de [${ACTIVIDADES_VALIDAS.join(', ')}],
  "presupuesto": null o uno de [${PRESUPUESTOS_VALIDOS.join(', ')}],
  "accesible": true o false
}

Responde solo el JSON.`;

  try {
    const respuesta = await generar(prompt);
    const limpio = respuesta.replace(/```json|```/g, '').trim();
    const criterios = JSON.parse(limpio);
    return normalizar(criterios);
  } catch (error) {
    console.error('No se pudieron extraer criterios:', error.message);
    // Ante un fallo de parseo, se devuelven criterios vacios (busqueda amplia).
    return { provincia: null, actividad: null, presupuesto: null, accesible: false };
  }
}

/** Descarta valores que no pertenezcan a los catalogos validos. */
function normalizar(c) {
  return {
    provincia: PROVINCIAS_VALIDAS.includes(c.provincia) ? c.provincia : null,
    actividad: ACTIVIDADES_VALIDAS.includes(c.actividad) ? c.actividad : null,
    presupuesto: PRESUPUESTOS_VALIDOS.includes(c.presupuesto) ? c.presupuesto : null,
    accesible: Boolean(c.accesible),
  };
}