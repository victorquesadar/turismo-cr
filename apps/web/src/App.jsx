import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { RUTAS } from './lib/rutas';
import PanelAuth from './features/autenticacion/components/PanelAuth';
import RutaAdmin from './features/autenticacion/components/RutaAdmin';
import DescubrirPage from './pages/DescubrirPage';
import SitioPage from './pages/SitioPage';
import FavoritosPage from './pages/FavoritosPage';
import AdminSitiosPage from './pages/admin/AdminSitiosPage';
import SitioFormPage from './pages/admin/SitioFormPage';
import SistemaPrincipal from './features/busqueda/SistemaPrincipal';

export default function App() {
  return (
    <BrowserRouter>
      <MarcoAplicacion />
    </BrowserRouter>
  );
}

function MarcoAplicacion() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('pagina-inicio', location.pathname === RUTAS.inicio);
    return () => {
      document.body.classList.remove('pagina-inicio');
    };
  }, [location.pathname]);

  return (
    <>
      <PanelAuth />
      <Routes>
        <Route path={RUTAS.inicio} element={<DescubrirPage />} />
        <Route path={RUTAS.sitio} element={<SitioPage />} />
        <Route path={RUTAS.favoritos} element={<FavoritosPage />} />
        <Route path={RUTAS.admin} element={<RutaAdmin><AdminSitiosPage /></RutaAdmin>} />
        <Route path={RUTAS.adminNuevo} element={<RutaAdmin><SitioFormPage /></RutaAdmin>} />
        <Route path={RUTAS.adminEditar} element={<RutaAdmin><SitioFormPage /></RutaAdmin>} />
        <Route path={RUTAS.mapa} element={<SistemaPrincipal />} />
        
        <Route path="*" element={<Marcador nombre="Página no encontrada" modulo="-" />} />
      </Routes>
    </>
  );
}

function Marcador({ nombre, modulo }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>{nombre}</h1>
      <p>Módulo del SRS: {modulo}</p>
      <p>Pendiente de implementación.</p>
    </main>
  );
}