import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RUTAS } from './lib/rutas';
import Encabezado from './components/layout/Encabezado';
import PanelAuth from './features/autenticacion/components/PanelAuth';
import DescubrirPage from './pages/DescubrirPage';
import SitioPage from './pages/SitioPage';
import FavoritosPage from './pages/FavoritosPage';

/**
 * Punto de entrada de la aplicacion.
 *
 * La autenticacion ya no es una pagina: se resuelve en el panel deslizante
 * PanelAuth, que se abre desde el encabezado o al intentar una accion que
 * requiere sesion. Por eso no hay rutas para ingreso ni registro.
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
        <Route path={RUTAS.asistente} element={<Marcador nombre="Asistente virtual" modulo="M06" />} />
        <Route path={RUTAS.admin} element={<Marcador nombre="Administracion" modulo="M07" />} />
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
