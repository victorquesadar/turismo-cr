import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

const AuthContext = createContext(null);

/**
 * Provee el estado de sesion a toda la aplicacion.
 * Escucha los cambios de autenticacion de Supabase para mantener
 * el usuario actualizado sin recargar la pagina.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Sesion existente al abrir la aplicacion.
    supabase.auth.getSession().then(({ data }) => {
      setUsuario(data.session?.user ?? null);
      setCargando(false);
    });

    // Cambios posteriores: login, logout, expiracion.
    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      setUsuario(sesion?.user ?? null);
    });

    return () => suscripcion.subscription.unsubscribe();
  }, []);

  const valor = {
    usuario,
    cargando,
    estaAutenticado: Boolean(usuario),
    nombre: usuario?.user_metadata?.nombre ?? usuario?.email ?? '',
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

/** Hook para consumir el estado de sesion desde cualquier componente. */
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (contexto === null) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider.');
  }
  return contexto;
}
