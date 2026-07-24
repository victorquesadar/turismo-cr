/**
 * Punto unico de lectura de variables de entorno (RNF-30).
 */

function requerida(nombre) {
  const valor = process.env[nombre];
  if (!valor) {
    throw new Error(
      `Falta la variable de entorno ${nombre}. Revisar apps/api/.env y docs/CONFIGURACION.md`
    );
  }
  return valor;
}

export const config = {
  puerto: Number(process.env.PORT ?? 3000),
  supabaseUrl: requerida('SUPABASE_URL'),
  supabaseServiceKey: requerida('SUPABASE_SERVICE_KEY'),
geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 20),
};
