import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { config } from './config/env.js';
import { manejadorErrores } from './middleware/manejadorErrores.js';
import { limitadorAsistente } from './middleware/limitador.js';
import saludRouter from './routes/salud.js';
import asistenteRouter from './routes/asistente.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '1mb' }));

app.use('/health', saludRouter);
app.use('/asistente', limitadorAsistente, asistenteRouter);

// RNF-23: manejador central de errores, sin exponer detalles internos.
app.use(manejadorErrores);

app.listen(config.puerto, () => {
  console.warn(`Servicio de orquestacion escuchando en el puerto ${config.puerto}`);
});
