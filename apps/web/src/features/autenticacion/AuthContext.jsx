import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

const AuthContext = createContext(null);

/**
 * Provee el estado de sesion y el rol del usuario a toda la aplicacion.
 * El rol se lee de la tabla perfiles y determina el acceso al panel de
 * administracion (RF-06).
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUsuario(u);
      if (u) cargarRol(u.id);
      else setCargando(false);
    });

    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      const u = sesion?.user ?? null;
      setUsuario(u);
      if (u) {
        cargarRol(u.id);
      } else {
        setRol(null);
        setCargando(false);
      }
    });

    return () => suscripcion.subscription.unsubscribe();
  }, []);

  async function cargarRol(idUsuario) {
    const { data } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('id', idUsuario)
      .maybeSingle();
    setRol(data?.rol ?? 'turista');
    setCargando(false);
  }

  const valor = {
    usuario,
    rol,
    cargando,
    estaAutenticado: Boolean(usuario),
    esAdministrador: rol === 'administrador',
    nombre: usuario?.user_metadata?.nombre ?? usuario?.email ?? '',
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (contexto === null) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider.');
  }
  return contexto;
}
