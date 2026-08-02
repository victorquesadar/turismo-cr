import { supabase } from '@/services/supabaseClient';
import { normalizarCredenciales, traducirError } from './authUtils';

/**
 * Operaciones de autenticacion contra Supabase Auth (RF-01 a RF-05).
 * Supabase se encarga del cifrado de contrasenas con hash y sal (RNF-11).
 */

/** RF-01: registro con correo y contrasena. */
export async function registrar(datos) {
  const credenciales = normalizarCredenciales(datos);
  const { data, error } = await supabase.auth.signUp({
    email: credenciales.correo,
    password: credenciales.contrasena,
    options: {
      data: { nombre: credenciales.nombre },
    },
  });

  if (error) throw new Error(traducirError(error.message));

  return {
    usuario: data.user,
    necesitaConfirmacion: !data.session,
    mensaje: data.session ? 'Cuenta creada correctamente.' : 'Cuenta creada. Revisá tu correo para confirmar la sesión.',
  };
}

/** RF-02: inicio de sesion. */
export async function iniciarSesion(datos) {
  const credenciales = normalizarCredenciales(datos);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credenciales.correo,
    password: credenciales.contrasena,
  });

  if (error) throw new Error(traducirError(error.message));
  return data.user;
}

/** RF-02 alternativa: inicio de sesion con Google. */
export async function iniciarSesionConGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: obtenerRedirectTo(),
      queryParams: {
        prompt: 'select_account',
      },
    },
  });

  if (error) throw new Error(traducirError(error.message));
}

/** RF-03: cierre de sesion. */
export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('No fue posible cerrar la sesión.');
}

function obtenerRedirectTo() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return `${window.location.origin}${window.location.pathname}`;
}
