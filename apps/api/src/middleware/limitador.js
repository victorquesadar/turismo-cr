import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

/**
 * RNF-16: limita la cantidad de consultas al asistente por persona usuaria
 * y unidad de tiempo, protegiendo la cuota de la API del modelo de lenguaje.
 */
export const limitadorAsistente = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    mensaje:
      'Se alcanzo el limite de consultas al asistente. Podes seguir explorando con los filtros de busqueda.',
  },
});
