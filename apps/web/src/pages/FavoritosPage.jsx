import { Link } from 'react-router-dom';
import { useAuth } from '@/features/autenticacion/AuthContext';
import { usePanelAuth } from '@/features/autenticacion/PanelAuthContext';
import { useSitiosFavoritos } from '@/features/favoritos/hooks/useSitiosFavoritos';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import { RUTAS } from '@/lib/rutas';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import estilos from './FavoritosPage.module.css';

/** RF-32: pagina de lugares favoritos del usuario. */
export default function FavoritosPage() {
  const { estaAutenticado, cargando: cargandoSesion } = useAuth();
  const { abrir } = usePanelAuth();
  const { sitios, cargando, error } = useSitiosFavoritos();

  if (cargandoSesion) return null;

  if (!estaAutenticado) {
    return (
      <main className={estilos.pagina}>
        <Link to={RUTAS.inicio} className={estilos.volver}>
          <FaArrowLeft />
          <span>Volver al inicio</span>
        </Link>

        <div className={estilos.aviso}>
          <div className={estilos.avisoIcono}>
            <FaHeart />
          </div>
          <h1 className={estilos.titulo}>Mis favoritos</h1>
          <p className={estilos.avisoTexto}>
            Iniciá sesión para ver y guardar tus lugares favoritos.
          </p>
          <button type="button" className={estilos.boton} onClick={() => abrir('ingreso')}>
            Iniciar sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={estilos.pagina}>
      <Link to={RUTAS.inicio} className={estilos.volver}>
        <FaArrowLeft />
        <span>Volver al inicio</span>
      </Link>

      <header className={estilos.encabezado}>
        <div className={estilos.tituloFila}>
          <FaHeart className={estilos.iconoTitulo} />
          <h1 className={estilos.titulo}>Mis favoritos</h1>
        </div>
        {!cargando && !error && (
          <p className={estilos.conteo}>
            {sitios.length} {sitios.length === 1 ? 'lugar guardado' : 'lugares guardados'}
          </p>
        )}
      </header>

      {!cargando && !error && sitios.length === 0 ? (
        <div className={estilos.vacio}>
          <div className={estilos.vacioIcono}>
            <FaHeart />
          </div>
          <p className={estilos.vacioTexto}>Todavía no has guardado ningún lugar.</p>
          <Link to={RUTAS.inicio} className={estilos.boton}>Explorar sitios</Link>
        </div>
      ) : (
        <ListaSitios sitios={sitios} cargando={cargando} error={error} />
      )}
    </main>
  );
}