import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizarCredenciales, traducirError, validarCredenciales } from './authUtils.js';

test('normaliza correos y contraseñas antes de autenticarse', () => {
  const resultado = normalizarCredenciales({
    correo: '  Usuario@Ejemplo.com  ',
    contrasena: '  123456  ',
  });

  assert.equal(resultado.correo, 'usuario@ejemplo.com');
  assert.equal(resultado.contrasena, '123456');
});

test('valida campos requeridos con mensajes claros', () => {
  const resultado = validarCredenciales({ correo: 'correo-invalido', contrasena: '123' }, 'registro');

  assert.equal(resultado.esValido, false);
  assert.equal(resultado.errores.nombre, 'Ingresá tu nombre.');
  assert.equal(resultado.errores.correo, 'Ingresá un correo válido.');
  assert.equal(resultado.errores.contrasena, 'La contraseña debe tener al menos 6 caracteres.');
});

test('traduce errores comunes de autenticación a mensajes claros', () => {
  assert.equal(traducirError('Invalid login credentials'), 'Correo o contraseña incorrectos.');
  assert.equal(traducirError('Email not confirmed'), 'Debés confirmar tu correo antes de iniciar sesión.');
  assert.equal(traducirError('Too many requests'), 'Demasiados intentos. Esperá unos minutos e intentá nuevamente.');
});
