import { useState } from 'react';
import estilos from './FormularioAuth.module.css';

/**
 * Formulario compartido por registro e inicio de sesion.
 * El modo determina si se muestra el campo de nombre.
 */
export default function FormularioAuth({ modo, onEnviar, cargando, error }) {
  const esRegistro = modo === 'registro';
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    onEnviar({ nombre, correo, contrasena });
  };

  return (
    <form className={estilos.formulario} onSubmit={manejarEnvio}>
      {esRegistro && (
        <label className={estilos.campo}>
          <span>Nombre</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
          />
        </label>
      )}

      <label className={estilos.campo}>
        <span>Correo electrónico</span>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          autoComplete="email"
        />
      </label>

      <label className={estilos.campo}>
        <span>Contraseña</span>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          minLength={6}
          autoComplete={esRegistro ? 'new-password' : 'current-password'}
        />
      </label>

      {error && <p className={estilos.error} role="alert">{error}</p>}

      <button type="submit" className={estilos.boton} disabled={cargando}>
        {cargando ? 'Procesando…' : esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
