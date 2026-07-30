import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RUTAS } from './lib/rutas';
import Encabezado from './components/layout/Encabezado';
import PanelAuth from './features/autenticacion/components/PanelAuth';
import RutaAdmin from './features/autenticacion/components/RutaAdmin';
import DescubrirPage from './pages/DescubrirPage';
import SitioPage from './pages/SitioPage';
import FavoritosPage from './pages/FavoritosPage';
import AdminSitiosPage from './pages/admin/AdminSitiosPage';
import SitioFormPage from './pages/admin/SitioFormPage';

/**
 * Punto de entrada de la aplicacion.
 *
 * Etapa 1 (lista): catalogo, filtros, mapa, ficha.
 * Etapa 2 (lista): autenticacion y favoritos.
 * Etapa 3 (en curso): administracion del catalogo, protegida por rol.
 * Etapa 4 (pendiente): asistente virtual.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Encabezado />
      <PanelAuth />
      <Routes>
        <Route path={RUTAS.inicio} element={<DescubrirPage />} />
        <Route path={RUTAS.sitio} element={<SitioPage />} />
        <Route path={RUTAS.favoritos} element={<FavoritosPage />} />

        <Route path={RUTAS.admin} element={<RutaAdmin><AdminSitiosPage /></RutaAdmin>} />
        <Route path={RUTAS.adminNuevo} element={<RutaAdmin><SitioFormPage /></RutaAdmin>} />
        <Route path={RUTAS.adminEditar} element={<RutaAdmin><SitioFormPage /></RutaAdmin>} />

        <Route path={RUTAS.asistente} element={<Marcador nombre="Asistente virtual" modulo="M06" />} />
        <Route path="*" element={<Marcador nombre="Pagina no encontrada" modulo="-" />} />
      </Routes>
    </BrowserRouter>
  );
}

/** Marcador temporal — se reemplaza al implementar cada pagina. */
function Marcador({ nombre, modulo }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>{nombre}</h1>
      <p>Modulo del SRS: {modulo}</p>
      <p>Pendiente de implementacion.</p>
    </main>
  );
}
