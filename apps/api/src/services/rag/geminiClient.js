import Groq from 'groq-sdk';
import { config } from '../../config/env.js';

/**
 * Cliente del modelo de lenguaje (RF-42, RF-43).
 *
 * Se usa Groq con Llama 3.3, que ofrece un tier gratuito estable.
 * El proveedor esta aislado en este archivo: el resto del sistema RAG
 * (extraccion de criterios, recuperacion, generacion) no cambia.
 */
const groq = new Groq({ apiKey: config.groqApiKey });

const MODELO = 'llama-3.3-70b-versatile';

/**
 * Envia un prompt al modelo y devuelve el texto de la respuesta.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generar(prompt) {
  const respuesta = await groq.chat.completions.create({
    model: MODELO,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return respuesta.choices[0]?.message?.content ?? '';
}
