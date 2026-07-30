import { useEffect, useState, useCallback } from 'react';
import { listarTodosLosSitios } from '../services/adminService';

/** Carga y recarga la lista completa de sitios para el panel admin. */
export function useListaAdmin() {
  const [sitios, setSitios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setSitios(await listarTodosLosSitios());
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { sitios, cargando, error, recargar };
}
