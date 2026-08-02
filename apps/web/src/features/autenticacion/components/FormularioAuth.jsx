import { useEffect, useMemo, useState } from 'react';
import { validarCredenciales } from '../services/authUtils';
import estilos from './FormularioAuth.module.css';
import { FcGoogle } from "react-icons/fc";

/**
 * Formulario compartido por registro e inicio de sesion.
 * El modo determina si se muestra el campo de nombre.
 */
export default function FormularioAuth({ modo, onEnviar, onGoogle, cargando, cargandoGoogle, error }) {
  const esRegistro = modo === 'registro';
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});

  const botonTexto = useMemo(() => {
    if (cargando) return 'Procesando…';
    return esRegistro ? 'Crear cuenta' : 'Iniciar sesión';
  }, [cargando, esRegistro]);

  useEffect(() => {
    setErrores({});
    setNombre('');
    setCorreo('');
    setContrasena('');
  }, [modo]);

  const limpiarError = (campo) => {
    setErrores((actuales) => {
      if (!actuales[campo]) return actuales;
      const siguientes = { ...actuales };
      delete siguientes[campo];
      return siguientes;
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const validacion = validarCredenciales({ nombre, correo, contrasena }, modo);
    setErrores(validacion.errores);

    if (!validacion.esValido) {
      return;
    }

    onEnviar(validacion.credenciales);
  };

  return (
    <form className={estilos.formulario} onSubmit={manejarEnvio} noValidate>
      {esRegistro && (
        <label className={estilos.campo}>
          <span>Nombre</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              limpiarError('nombre');
            }}
            required
            autoComplete="name"
            placeholder="Tu nombre"
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? 'error-nombre' : undefined}
          />
          {errores.nombre && (
            <p id="error-nombre" className={estilos.errorCampo} role="alert">
              {errores.nombre}
            </p>
          )}
        </label>
      )}

      <label className={estilos.campo}>
        <span>Correo electrónico</span>
        <input
          type="email"
          value={correo}
          onChange={(e) => {
            setCorreo(e.target.value);
            limpiarError('correo');
          }}
          required
          autoComplete="email"
          placeholder="tu@correo.com"
          inputMode="email"
          autoCapitalize="none"
          spellCheck="false"
          aria-invalid={Boolean(errores.correo)}
          aria-describedby={errores.correo ? 'error-correo' : undefined}
        />
        {errores.correo && (
          <p id="error-correo" className={estilos.errorCampo} role="alert">
            {errores.correo}
          </p>
        )}
      </label>

      <label className={estilos.campo}>
        <span>Contraseña</span>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => {
            setContrasena(e.target.value);
            limpiarError('contrasena');
          }}
          required
          minLength={6}
          autoComplete={esRegistro ? 'new-password' : 'current-password'}
          placeholder={esRegistro ? 'Mínimo 6 caracteres' : 'Tu contraseña'}
          aria-invalid={Boolean(errores.contrasena)}
          aria-describedby={errores.contrasena ? 'error-contrasena' : undefined}
        />
        {errores.contrasena && (
          <p id="error-contrasena" className={estilos.errorCampo} role="alert">
            {errores.contrasena}
          </p>
        )}
      </label>

      {error && (
        <p className={estilos.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={estilos.boton} disabled={cargando}>
        {botonTexto}
      </button>

      <div className={estilos.divisor} aria-hidden="true">
        <span>o</span>
      </div>

      <button type="button" className={estilos.botonGoogle} onClick={onGoogle} disabled={cargando || cargandoGoogle}>
        <FcGoogle />
        {cargandoGoogle ? ' Abriendo Google…' : ' Continuar con Google'}
      </button>
    </form>
  );
}
