import { useEffect, useState } from 'react';
import { obtenerSitios } from '../services/sitiosService';

/**
 * Carga el catalogo de sitios turisticos (RF-08).
 *
 * Expone los tres estados que la vista necesita distinguir:
 * cargando, error y datos disponibles (RNF-03).
 */
export function useSitios() {
  const [sitios, setSitios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let vigente = true;

    async function cargar() {
      setCargando(true);
      setError(null);

      try {
        const resultado = await obtenerSitios();
        if (vigente) setSitios(resultado);
      } catch (e) {
        if (vigente) setError(e.message);
      } finally {
        if (vigente) setCargando(false);
      }
    }

    cargar();

    // Evita actualizar el estado si el componente se desmonto antes
    // de que la peticion terminara.
    return () => {
      vigente = false;
    };
  }, []);

  return { sitios, cargando, error };
}
