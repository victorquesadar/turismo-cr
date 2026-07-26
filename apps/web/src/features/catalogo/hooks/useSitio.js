import { useEffect, useState } from 'react';
import { obtenerSitioPorId } from '../services/sitiosService';

/**
 * Carga un unico sitio por su identificador (RF-09).
 * Distingue el estado "no encontrado" del estado "error de carga".
 */
export function useSitio(id) {
  const [sitio, setSitio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [noEncontrado, setNoEncontrado] = useState(false);

  useEffect(() => {
    let vigente = true;

    async function cargar() {
      setCargando(true);
      setError(null);
      setNoEncontrado(false);

      try {
        const resultado = await obtenerSitioPorId(id);
        if (!vigente) return;
        if (resultado) {
          setSitio(resultado);
        } else {
          setNoEncontrado(true);
        }
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
  }, [id]);

  return { sitio, cargando, error, noEncontrado };
}
