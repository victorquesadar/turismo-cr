import { createClient } from '@supabase/supabase-js';
import { env } from '@/config/env';

/**
 * Cliente unico de Supabase para toda la aplicacion.
 * Usa la llave publica (anon); el acceso a los datos queda controlado
 * por las politicas de seguridad a nivel de fila (RNF-14, RNF-21).
 */
export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);
