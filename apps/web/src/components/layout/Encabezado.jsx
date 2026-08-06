import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/features/autenticacion/AuthContext';
import { usePanelAuth } from '@/features/autenticacion/PanelAuthContext';
import { useFavoritos } from '@/features/favoritos/FavoritosContext';
import { cerrarSesion } from '@/features/autenticacion/services/authService';
import { RUTAS } from '@/lib/rutas';
import estilos from './Encabezado.module.css';

/**
 * Barra de navegacion principal.
 */
export default function Encabezado() {
  const { estaAutenticado, esAdministrador, nombre } = useAuth();
  const { cantidad } = useFavoritos();
  const { abrir } = usePanelAuth();

const enlaces = [
    { to: RUTAS.mapa, label: 'Buscar destinos' },
    { to: { pathname: '/', hash: 'sobre-nosotros' }, label: 'Sobre nosotros' },
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
          <NavLink to={RUTAS.favoritos} className={estilos.enlace}>
            Favoritos{estaAutenticado && cantidad > 0 ? ` (${cantidad})` : ''}
          </NavLink>
          {esAdministrador && (
            <NavLink to={RUTAS.admin} className={estilos.enlace}>
              Administración
            </NavLink>
          )}
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