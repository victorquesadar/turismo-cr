/**
 * RNF-23: presenta mensajes comprensibles sin exponer detalles tecnicos.
 * RNF-25: registra el error con fecha, origen y detalle para diagnostico.
 */
export function manejadorErrores(error, req, res, _next) {
  console.error(
    JSON.stringify({
      fecha: new Date().toISOString(),
      ruta: req.originalUrl,
      metodo: req.method,
      detalle: error.message,
    })
  );

  const estado = error.estado ?? 500;
  const mensaje = estado === 500 ? 'Ocurrio un error al procesar la solicitud.' : error.message;

  res.status(estado).json({ mensaje });
}
