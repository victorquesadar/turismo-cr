import { responderConsulta } from '../services/rag/asistenteService.js';

/** POST /asistente/consulta */
export async function consultar(req, res, next) {
  try {
    const { mensaje } = req.body;

    if (!mensaje || typeof mensaje !== 'string' || !mensaje.trim()) {
      return res.status(400).json({ mensaje: 'El mensaje no puede estar vacío.' });
    }

    const resultado = await responderConsulta(mensaje.trim());
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}
