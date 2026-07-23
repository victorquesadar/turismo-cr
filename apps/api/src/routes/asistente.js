import { Router } from 'express';

const router = Router();

/**
 * POST /asistente/consulta
 *
 * Implementa el flujo RAG descrito en la seccion 7.2 del SRS:
 *   1. Extraer criterios del mensaje                → RF-40
 *   2. Recuperar sitios del catalogo                → RF-42
 *   3. Generar respuesta restringida a esos sitios  → RF-43
 *   4. Informar sin inventar si no hubo resultados  → RF-50
 *
 * Pendiente de implementacion (etapa 4 del plan, seccion 8.1 del SRS).
 */
router.post('/consulta', (_req, res) => {
  res.status(501).json({ mensaje: 'Endpoint pendiente de implementacion.' });
});

export default router;
