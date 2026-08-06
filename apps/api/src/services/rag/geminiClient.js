import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config/env.js';

/**
 * Cliente del modelo de lenguaje (RF-42, RF-43).
 * Se usa un modelo rapido y economico del tier gratuito.
 */
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const modelo = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Envia un prompt al modelo y devuelve el texto de la respuesta.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generar(prompt) {
  const resultado = await modelo.generateContent(prompt);
  return resultado.response.text();
}
