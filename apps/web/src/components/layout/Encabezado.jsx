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

  const claseEnlace = ({ isActive }) =>
    `${estilos.enlace} ${isActive ? estilos.activo : ''}`;

  return (
    <header className={estilos.barra}>
      <div className={estilos.contenido}>
        <Link to={RUTAS.inicio} className={estilos.logo}>
          Descubre<span>CR</span>
        </Link>

        <nav className={estilos.navegacion}>
          <NavLink to={RUTAS.inicio} className={claseEnlace} end>
            Descubrir
          </NavLink>
          <NavLink to={RUTAS.asistente} className={claseEnlace}>
            Asistente
          </NavLink>
          <NavLink to={RUTAS.favoritos} className={claseEnlace}>
            Favoritos{estaAutenticado && cantidad > 0 ? ` (${cantidad})` : ''}
          </NavLink>
          {esAdministrador && (
            <NavLink to={RUTAS.admin} className={claseEnlace}>
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
            <>
              <button type="button" className={estilos.botonTexto} onClick={() => abrir('ingreso')}>
                Iniciar sesión
              </button>
              <button type="button" className={estilos.botonPrimario} onClick={() => abrir('registro')}>
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
