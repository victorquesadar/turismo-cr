import { useState, useEffect } from 'react';
import { usePanelAuth } from '../PanelAuthContext';
import { registrar, iniciarSesion, iniciarSesionConGoogle } from '../services/authService';
import FormularioAuth from './FormularioAuth';
import estilos from './PanelAuth.module.css';

/**
 * Panel de autenticacion que se desliza desde la izquierda (RF-01, RF-02).
 * Alterna entre iniciar sesion y registrarse sin cambiar de pagina.
 */
export default function PanelAuth() {
  const { abierto, modo, setModo, cerrar } = usePanelAuth();
  const [cargando, setCargando] = useState(false);
  const [cargandoGoogle, setCargandoGoogle] = useState(false);
  const [error, setError] = useState(null);

  const esRegistro = modo === 'registro';

  // Limpia el error al cambiar de modo o cerrar.
  useEffect(() => {
    setError(null);
  }, [modo, abierto]);

  useEffect(() => {
    if (!abierto) {
      setCargando(false);
      setCargandoGoogle(false);
      setError(null);
    }
  }, [abierto]);

  // Cierra con la tecla Escape.
  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e) => e.key === 'Escape' && cerrar();
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [abierto, cerrar]);

  const manejarEnvio = async (datos) => {
    setCargando(true);
    setError(null);
    try {
      if (esRegistro) {
        await registrar(datos);
      } else {
        await iniciarSesion(datos);
      }
      cerrar();
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarGoogle = async () => {
    setCargandoGoogle(true);
    setError(null);

    try {
      await iniciarSesionConGoogle();
    } catch (e) {
      setError(e.message);
      setCargandoGoogle(false);
    }
  };

  return (
    <>
      <div
        className={`${estilos.fondo} ${abierto ? estilos.fondoVisible : ''}`}
        onClick={cerrar}
        aria-hidden="true"
      />

      <aside
        className={`${estilos.panel} ${abierto ? estilos.panelAbierto : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
      >
        <button type="button" className={estilos.cerrar} onClick={cerrar} aria-label="Cerrar">
          ×
        </button>

        <div className={estilos.contenido}>
          <h2 className={estilos.titulo}>{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
          <p className={estilos.subtitulo}>
            {esRegistro
              ? 'Registrate para guardar tus lugares favoritos.'
              : 'Ingresá para acceder a tus favoritos.'}
          </p>

          <FormularioAuth
            key={`${abierto ? 'abierto' : 'cerrado'}-${modo}`}
            modo={esRegistro ? 'registro' : 'ingreso'}
            onEnviar={manejarEnvio}
            onGoogle={manejarGoogle}
            cargando={cargando}
            cargandoGoogle={cargandoGoogle}
            error={error}
          />

          <p className={estilos.alterno}>
            {esRegistro ? (
              <>
                ¿Ya tenés cuenta?{' '}
                <button type="button" onClick={() => setModo('ingreso')}>
                  Iniciá sesión
                </button>
              </>
            ) : (
              <>
                ¿No tenés cuenta?{' '}
                <button type="button" onClick={() => setModo('registro')}>
                  Registrate
                </button>
              </>
            )}
          </p>
        </div>
      </aside>
    </>
  );
}
