import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registrar, iniciarSesionConGoogle } from '@/features/autenticacion/services/authService';
import FormularioAuth from '@/features/autenticacion/components/FormularioAuth';
import { RUTAS } from '@/lib/rutas';
import estilos from './AuthPage.module.css';

/** RF-01: pagina de registro. */
export default function RegistroPage() {
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [cargandoGoogle, setCargandoGoogle] = useState(false);
  const [error, setError] = useState(null);

  const manejarRegistro = async (datos) => {
    setCargando(true);
    setError(null);
    try {
      await registrar(datos);
      navegar(RUTAS.inicio);
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
    <main className={estilos.pagina}>
      <div className={estilos.tarjeta}>
        <h1 className={estilos.titulo}>Crear cuenta</h1>
        <p className={estilos.subtitulo}>
          Registrate para guardar tus lugares favoritos y usar el asistente virtual.
        </p>

        <FormularioAuth
          modo="registro"
          onEnviar={manejarRegistro}
          onGoogle={manejarGoogle}
          cargando={cargando}
          cargandoGoogle={cargandoGoogle}
          error={error}
        />

        <p className={estilos.alterno}>
          ¿Ya tenés cuenta? <Link to={RUTAS.ingreso}>Iniciá sesión</Link>
        </p>
      </div>
    </main>
  );
}
