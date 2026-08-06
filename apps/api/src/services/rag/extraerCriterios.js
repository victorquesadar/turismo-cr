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
  const prompt = `Analiza el siguiente mensaje de una persona que busca sitios turisticos en Costa Rica y extrae los criterios de busqueda.

Mensaje: "${mensaje}"

Devuelve UNICAMENTE un objeto JSON valido, sin texto adicional ni formato markdown, con esta estructura:
{
  "provincia": null o uno de [${PROVINCIAS_VALIDAS.join(', ')}],
  "actividad": null o uno de [${ACTIVIDADES_VALIDAS.join(', ')}],
  "presupuesto": null o uno de [${PRESUPUESTOS_VALIDOS.join(', ')}],
  "accesible": true si menciona silla de ruedas, movilidad reducida o accesibilidad, si no false,
  "texto": palabras clave relevantes para buscar, o null
}

Si un criterio no se menciona, ponlo en null. Responde solo el JSON.`;

  try {
    const respuesta = await generar(prompt);
    const limpio = respuesta.replace(/```json|```/g, '').trim();
    const criterios = JSON.parse(limpio);
    return normalizar(criterios);
  } catch (error) {
    console.error('No se pudieron extraer criterios:', error.message);
    // Ante un fallo de parseo, se busca solo por el texto completo.
    return { provincia: null, actividad: null, presupuesto: null, accesible: false, texto: mensaje };
  }
}

/** Descarta valores que no pertenezcan a los catalogos validos. */
function normalizar(c) {
  return {
    provincia: PROVINCIAS_VALIDAS.includes(c.provincia) ? c.provincia : null,
    actividad: ACTIVIDADES_VALIDAS.includes(c.actividad) ? c.actividad : null,
    presupuesto: PRESUPUESTOS_VALIDOS.includes(c.presupuesto) ? c.presupuesto : null,
    accesible: Boolean(c.accesible),
    texto: typeof c.texto === 'string' && c.texto.trim() ? c.texto.trim() : null,
  };
}
