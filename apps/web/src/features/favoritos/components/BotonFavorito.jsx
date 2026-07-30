import { useAuth } from '@/features/autenticacion/AuthContext';
import { usePanelAuth } from '@/features/autenticacion/PanelAuthContext';
import { useFavoritos } from '../FavoritosContext';
import estilos from './BotonFavorito.module.css';

/**
 * Boton de corazon para marcar o quitar un favorito (RF-30, RF-31).
 * Si la persona no ha iniciado sesion, abre el panel de acceso (RF-37).
 */
export default function BotonFavorito({ sitioId }) {
  const { estaAutenticado } = useAuth();
  const { esFavorito, alternar } = useFavoritos();
  const { abrir } = usePanelAuth();

  const activo = estaAutenticado && esFavorito(sitioId);

  const manejarClic = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!estaAutenticado) {
      abrir('ingreso'); // RF-37
      return;
    }
    alternar(sitioId);
  };

  return (
    <button
      type="button"
      className={`${estilos.boton} ${activo ? estilos.activo : ''}`}
      onClick={manejarClic}
      aria-label={activo ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      aria-pressed={activo}
      title={activo ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M12 21s-6.7-4.3-9.3-8.1C.9 10.1 1.6 6.6 4.4 5.4 6.5 4.5 8.8 5.2 10 7c1.2-1.8 3.5-2.5 5.6-1.6 2.8 1.2 3.5 4.7 1.7 7.5C18.7 16.7 12 21 12 21z"
          fill={activo ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
