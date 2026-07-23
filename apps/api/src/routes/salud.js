import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ estado: 'operativo', servicio: 'orquestacion-asistente' });
});

export default router;
