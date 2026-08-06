import { apiClient } from '@/services/apiClient';

/**
 * Envia una consulta al asistente virtual (RF-38).
 * Devuelve la respuesta redactada, los criterios detectados (RF-41)
 * y los sitios recomendados con enlace a su ficha (RF-44).
 */
export async function consultarAsistente(mensaje) {
  return apiClient.post('/asistente/consulta', { mensaje });
}
