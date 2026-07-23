/**
 * Punto unico de lectura de variables de entorno (RNF-30).
 * Ningun otro archivo debe usar import.meta.env directamente.
 */

function requerida(nombre, valor) {
  if (!valor) {
    throw new Error(
      `Falta la variable de entorno ${nombre}. Revisar apps/web/.env y docs/CONFIGURACION.md`
    );
  }
  return valor;
}

export const env = {
  supabaseUrl: requerida('VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: requerida('VITE_SUPABASE_ANON_KEY', import.meta.env.VITE_SUPABASE_ANON_KEY),
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  mapsApiKey: import.meta.env.VITE_MAPS_API_KEY ?? '',
};
