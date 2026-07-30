import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/features/autenticacion/AuthContext';
import {
  obtenerIdsFavoritos,
  agregarFavorito,
  quitarFavorito,
} from './services/favoritosService';

const FavoritosContext = createContext(null);

/**
 * Mantiene en memoria el conjunto de IDs favoritos del usuario para que
 * cualquier tarjeta pueda saber al instante si un sitio esta guardado,
 * sin consultar la base en cada render (RF-30, RF-31, RF-36).
 */
export function FavoritosProvider({ children }) {
  const { estaAutenticado, usuario } = useAuth();
  const [ids, setIds] = useState(new Set());

  const recargar = useCallback(async () => {
    if (!estaAutenticado) {
      setIds(new Set());
      return;
    }
    try {
      const lista = await obtenerIdsFavoritos();
      setIds(new Set(lista));
    } catch {
      setIds(new Set());
    }
  }, [estaAutenticado]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  const esFavorito = useCallback((sitioId) => ids.has(sitioId), [ids]);

  const alternar = useCallback(
    async (sitioId) => {
      // Actualizacion optimista: se refleja de inmediato y se revierte si falla.
      const eraFavorito = ids.has(sitioId);
      const nuevos = new Set(ids);
      eraFavorito ? nuevos.delete(sitioId) : nuevos.add(sitioId);
      setIds(nuevos);

      try {
        if (eraFavorito) {
          await quitarFavorito(sitioId);
        } else {
          await agregarFavorito(sitioId, usuario.id);
        }
      } catch {
        setIds(ids); // revertir
      }
    },
    [ids, usuario]
  );

  return (
    <FavoritosContext.Provider value={{ esFavorito, alternar, cantidad: ids.size, recargar }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);
  if (contexto === null) {
    throw new Error('useFavoritos debe usarse dentro de un FavoritosProvider.');
  }
  return contexto;
}
