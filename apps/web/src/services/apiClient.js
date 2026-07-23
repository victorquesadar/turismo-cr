import { env } from '@/config/env';

/**
 * Cliente del servicio de orquestacion.
 * Solo las operaciones del asistente virtual pasan por aqui; el resto
 * del catalogo se consulta directamente contra Supabase.
 */
async function peticion(ruta, opciones = {}) {
  const respuesta = await fetch(`${env.apiUrl}${ruta}`, {
    headers: { 'Content-Type': 'application/json', ...opciones.headers },
    ...opciones,
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.json().catch(() => ({}));
    // RNF-23: mensaje comprensible, sin exponer detalles internos.
    throw new Error(detalle.mensaje ?? 'No fue posible completar la solicitud.');
  }

  return respuesta.json();
}

export const apiClient = {
  get: (ruta) => peticion(ruta),
  post: (ruta, cuerpo) => peticion(ruta, { method: 'POST', body: JSON.stringify(cuerpo) }),
};
