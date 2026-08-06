import { extraerCriterios } from './extraerCriterios.js';
import { recuperarSitios } from './recuperarSitios.js';
import { generarRecomendacion } from './generarRecomendacion.js';

/**
 * Orquesta el flujo RAG completo (seccion 7.2 del SRS):
 *   1. Extraer criterios del mensaje        (RF-40)
 *   2. Recuperar sitios del catalogo         (RF-42)
 *   3. Generar la respuesta restringida      (RF-43, RF-44, RF-50)
 */
export async function responderConsulta(mensaje) {
  const criterios = await extraerCriterios(mensaje);
  const sitios = await recuperarSitios(criterios);
  const recomendacion = await generarRecomendacion(mensaje, sitios);

  return {
    criterios,          // RF-41: se devuelven para mostrarlos en el panel de preferencias
    respuesta: recomendacion.texto,
    sitios: recomendacion.sitios,
  };
}
