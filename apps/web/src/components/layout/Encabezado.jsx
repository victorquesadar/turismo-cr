import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/features/autenticacion/AuthContext';
import { usePanelAuth } from '@/features/autenticacion/PanelAuthContext';
import { cerrarSesion } from '@/features/autenticacion/services/authService';
import { RUTAS } from '@/lib/rutas';
import estilos from './Encabezado.module.css';

/**
 * Barra de navegacion principal.
 * Muestra el acceso al panel de administracion solo a administradores.
 */
export default function Encabezado() {
  const { estaAutenticado, nombre } = useAuth();
  const { abrir } = usePanelAuth();

  const enlaces = [
    { to: { pathname: '/', hash: 'sobre-nosotros' }, label: 'Sobre nosotros' },
    { to: { pathname: '/', hash: 'asistente' }, label: 'Búsqueda por IA' },
    { to: { pathname: '/', hash: 'busqueda-manual' }, label: 'Búsqueda manual' },
  ];

  return (
    <header className={estilos.barra}>
      <div className={estilos.contenido}>
        <Link to={RUTAS.inicio} className={estilos.logo}>
          <span className={estilos.logoD}>D</span>escubre
          <span className={estilos.logoC}>C</span>
          <span className={estilos.logoR}>R</span>
        </Link>

        <nav className={estilos.navegacion}>
          {enlaces.map((enlace) => (
            <Link key={enlace.label} to={enlace.to} className={estilos.enlace}>
              {enlace.label}
            </Link>
          ))}
        </nav>

        <div className={estilos.sesion}>
          {estaAutenticado ? (
            <>
              <span className={estilos.saludo}>Hola, {nombre.split(' ')[0]}</span>
              <button type="button" className={estilos.botonTexto} onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button type="button" className={estilos.botonPrimario} onClick={() => abrir('ingreso')}>
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
