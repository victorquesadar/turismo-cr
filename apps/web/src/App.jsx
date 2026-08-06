import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RUTAS } from './lib/rutas';
import Encabezado from './components/layout/Encabezado';
import PanelAuth from './features/autenticacion/components/PanelAuth';
import RutaAdmin from './features/autenticacion/components/RutaAdmin';
import DescubrirPage from './pages/DescubrirPage';
import SitioPage from './pages/SitioPage';
import FavoritosPage from './pages/FavoritosPage';
import AsistentePage from './pages/AsistentePage';
import AdminSitiosPage from './pages/admin/AdminSitiosPage';
import SitioFormPage from './pages/admin/SitioFormPage';

/**
 * Punto de entrada de la aplicacion.
 *
 * Etapa 1: catalogo, filtros, mapa, ficha.
 * Etapa 2: autenticacion y favoritos.
 * Etapa 3: administracion del catalogo.
 * Etapa 4: asistente virtual con RAG.
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
        <Route path={RUTAS.asistente} element={<AsistentePage />} />

        <Route path={RUTAS.admin} element={<RutaAdmin><AdminSitiosPage /></RutaAdmin>} />
        <Route path={RUTAS.adminNuevo} element={<RutaAdmin><SitioFormPage /></RutaAdmin>} />
        <Route path={RUTAS.adminEditar} element={<RutaAdmin><SitioFormPage /></RutaAdmin>} />

        <Route path="*" element={<Marcador nombre="Pagina no encontrada" modulo="-" />} />
      </Routes>
    </BrowserRouter>
  );
}

function Marcador({ nombre, modulo }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>{nombre}</h1>
      <p>Modulo del SRS: {modulo}</p>
      <p>Pendiente de implementacion.</p>
    </main>
  );
}
