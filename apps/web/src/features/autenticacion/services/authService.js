import { supabase } from '@/services/supabaseClient';

/**
 * Operaciones de autenticacion contra Supabase Auth (RF-01 a RF-05).
 * Supabase se encarga del cifrado de contrasenas con hash y sal (RNF-11).
 */

/** RF-01: registro con correo y contrasena. */
export async function registrar({ nombre, correo, contrasena }) {
  const { data, error } = await supabase.auth.signUp({
    email: correo,
    password: contrasena,
    options: {
      data: { nombre },
    },
  });

  if (error) throw new Error(traducirError(error.message));
  return data.user;
}

/** RF-02: inicio de sesion. */
export async function iniciarSesion({ correo, contrasena }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: correo,
    password: contrasena,
  });

  if (error) throw new Error(traducirError(error.message));
  return data.user;
}

/** RF-03: cierre de sesion. */
export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('No fue posible cerrar la sesión.');
}

/** Traduce los mensajes de error de Supabase a texto claro (RNF-23). */
function traducirError(mensaje) {
  const mapa = {
    'Invalid login credentials': 'Correo o contraseña incorrectos.',
    'User already registered': 'Ya existe una cuenta con este correo.',
    'Password should be at least 6 characters':
      'La contraseña debe tener al menos 6 caracteres.',
    'Unable to validate email address: invalid format': 'El correo no tiene un formato válido.',
  };
  return mapa[mensaje] ?? 'Ocurrió un error. Intentá de nuevo.';
}
