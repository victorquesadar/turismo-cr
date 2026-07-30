import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { iniciarSesion } from '@/features/autenticacion/services/authService';
import FormularioAuth from '@/features/autenticacion/components/FormularioAuth';
import { RUTAS } from '@/lib/rutas';
import estilos from './AuthPage.module.css';

/** RF-02: pagina de inicio de sesion. */
export default function IngresoPage() {
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const manejarIngreso = async (datos) => {
    setCargando(true);
    setError(null);
    try {
      await iniciarSesion(datos);
      navegar(RUTAS.inicio);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={estilos.pagina}>
      <div className={estilos.tarjeta}>
        <h1 className={estilos.titulo}>Iniciar sesión</h1>
        <p className={estilos.subtitulo}>Ingresá para acceder a tus favoritos.</p>

        <FormularioAuth modo="ingreso" onEnviar={manejarIngreso} cargando={cargando} error={error} />

        <p className={estilos.alterno}>
          ¿No tenés cuenta? <Link to={RUTAS.registro}>Registrate</Link>
        </p>
      </div>
    </main>
  );
}
