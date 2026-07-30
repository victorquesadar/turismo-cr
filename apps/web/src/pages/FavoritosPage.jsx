import { Link } from 'react-router-dom';
import { useAuth } from '@/features/autenticacion/AuthContext';
import { usePanelAuth } from '@/features/autenticacion/PanelAuthContext';
import { useSitiosFavoritos } from '@/features/favoritos/hooks/useSitiosFavoritos';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import { RUTAS } from '@/lib/rutas';
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
        <div className={estilos.aviso}>
          <h1 className={estilos.titulo}>Mis favoritos</h1>
          <p>Iniciá sesión para ver y guardar tus lugares favoritos.</p>
          <button type="button" className={estilos.boton} onClick={() => abrir('ingreso')}>
            Iniciar sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={estilos.pagina}>
      <header className={estilos.encabezado}>
        <h1 className={estilos.titulo}>Mis favoritos</h1>
        {!cargando && !error && (
          <p className={estilos.conteo}>
            {sitios.length} {sitios.length === 1 ? 'lugar guardado' : 'lugares guardados'}
          </p>
        )}
      </header>

      {!cargando && !error && sitios.length === 0 ? (
        <div className={estilos.vacio}>
          <p>Todavía no has guardado ningún lugar.</p>
          <Link to={RUTAS.inicio} className={estilos.boton}>Explorar sitios</Link>
        </div>
      ) : (
        <ListaSitios sitios={sitios} cargando={cargando} error={error} />
      )}
    </main>
  );
}
