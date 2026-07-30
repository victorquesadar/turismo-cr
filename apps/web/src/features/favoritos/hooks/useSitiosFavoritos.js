import { useEffect, useState } from 'react';
import { obtenerSitiosFavoritos } from '../services/favoritosService';
import { useFavoritos } from '../FavoritosContext';

/**
 * Carga la lista completa de sitios favoritos del usuario (RF-32).
 * Se recarga cuando cambia la cantidad de favoritos.
 */
export function useSitiosFavoritos() {
  const { cantidad } = useFavoritos();
  const [sitios, setSitios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let vigente = true;

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const resultado = await obtenerSitiosFavoritos();
        if (vigente) setSitios(resultado);
      } catch (e) {
        if (vigente) setError(e.message);
      } finally {
        if (vigente) setCargando(false);
      }
    }

    cargar();
    return () => {
      vigente = false;
    };
  }, [cantidad]);

  return { sitios, cargando, error };
}
