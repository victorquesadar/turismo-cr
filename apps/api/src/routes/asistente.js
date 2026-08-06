import { Router } from 'express';
import { consultar } from '../controllers/asistenteController.js';

const router = Router();

/**
 * POST /asistente/consulta
 * Implementa el flujo RAG (seccion 7.2 del SRS).
 */
router.post('/consulta', consultar);

export default router;
