import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { RUTAS } from '@/lib/rutas';

/**
 * Protege las rutas de administracion (RF-06).
 * Redirige a quien no sea administrador. La proteccion real esta en las
 * politicas RLS; esto solo evita mostrar una interfaz inutil.
 */
export default function RutaAdmin({ children }) {
  const { cargando, esAdministrador } = useAuth();

  if (cargando) return null;
  if (!esAdministrador) return <Navigate to={RUTAS.inicio} replace />;

  return children;
}
