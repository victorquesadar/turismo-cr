import { createContext, useContext, useState, useCallback } from 'react';

const PanelAuthContext = createContext(null);

/**
 * Controla la visibilidad del panel de autenticacion deslizante.
 * Permite abrirlo en modo 'ingreso' o 'registro' desde cualquier
 * componente (el encabezado, el boton de favorito, etc.).
 */
export function PanelAuthProvider({ children }) {
  const [abierto, setAbierto] = useState(false);
  const [modo, setModo] = useState('ingreso');

  const abrir = useCallback((modoInicial = 'ingreso') => {
    setModo(modoInicial);
    setAbierto(true);
  }, []);

  const cerrar = useCallback(() => setAbierto(false), []);

  return (
    <PanelAuthContext.Provider value={{ abierto, modo, setModo, abrir, cerrar }}>
      {children}
    </PanelAuthContext.Provider>
  );
}

export function usePanelAuth() {
  const contexto = useContext(PanelAuthContext);
  if (contexto === null) {
    throw new Error('usePanelAuth debe usarse dentro de un PanelAuthProvider.');
  }
  return contexto;
}
