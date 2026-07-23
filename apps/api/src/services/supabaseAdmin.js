import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

/**
 * Cliente de Supabase con llave de servicio.
 * Omite las politicas de seguridad a nivel de fila, por lo que solo debe
 * usarse en el servidor y nunca exponerse al navegador (RNF-13).
 */
export const supabaseAdmin = createClient(config.supabaseUrl, config.supabaseServiceKey, {
  auth: { persistSession: false },
});
