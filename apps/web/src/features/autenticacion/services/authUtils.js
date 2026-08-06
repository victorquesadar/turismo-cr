export function normalizarCredenciales({ nombre, correo, contrasena }) {
  return {
    nombre: (nombre ?? '').trim(),
    correo: (correo ?? '').trim().toLowerCase(),
    contrasena: (contrasena ?? '').trim(),
  };
}

export function validarCredenciales(datos, modo) {
  const credenciales = normalizarCredenciales(datos);
  const errores = {};
  const esRegistro = modo === 'registro';

  if (esRegistro && !credenciales.nombre) {
    errores.nombre = 'Ingresá tu nombre.';
  }

  if (!credenciales.correo) {
    errores.correo = 'Ingresá tu correo electrónico.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credenciales.correo)) {
    errores.correo = 'Ingresá un correo válido.';
  }

  if (!credenciales.contrasena) {
    errores.contrasena = 'Ingresá tu contraseña.';
  } else if (credenciales.contrasena.length < 6) {
    errores.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
  }

  return {
    credenciales,
    errores,
    esValido: Object.keys(errores).length === 0,
  };
}

export function traducirError(mensaje = '') {
  const mapa = {
    'Invalid login credentials': 'Correo o contraseña incorrectos.',
    'User already registered': 'Ya existe una cuenta con este correo.',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
    'Unable to validate email address: invalid format': 'El correo no tiene un formato válido.',
    'Email not confirmed': 'Debés confirmar tu correo antes de iniciar sesión.',
    'Too many requests': 'Demasiados intentos. Esperá unos minutos e intentá nuevamente.',
    'Unsupported provider': 'El inicio con Google no está habilitado en Supabase.',
    'Provider not enabled': 'El inicio con Google no está habilitado en Supabase.',
  };

  return mapa[mensaje] ?? 'Ocurrió un error. Intentá de nuevo.';
}

export function construirMensajeExito(modo, { necesitaConfirmacion, mensaje }) {
  if (mensaje) return mensaje;

  return necesitaConfirmacion
    ? 'Cuenta creada. Revisá tu correo para confirmar la sesión.'
    : modo === 'registro'
      ? 'Cuenta creada correctamente.'
      : 'Sesión iniciada correctamente.';
}
