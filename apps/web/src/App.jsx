import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RUTAS } from './lib/rutas';
import DescubrirPage from './pages/DescubrirPage';
import SitioPage from './pages/SitioPage';

/**
 * Punto de entrada de la aplicacion.
 *
 * Etapa 1 (en curso): M02 Catalogo, M03 Filtros, M04 Mapa.
 * Las paginas de las etapas siguientes aun muestran un marcador.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RUTAS.inicio} element={<DescubrirPage />} />
        <Route path={RUTAS.sitio} element={<SitioPage />} />
        <Route path={RUTAS.mapa} element={<Marcador nombre="Mapa interactivo" modulo="M04" />} />
        <Route path={RUTAS.favoritos} element={<Marcador nombre="Mis favoritos" modulo="M05" />} />
        <Route path={RUTAS.asistente} element={<Marcador nombre="Asistente virtual" modulo="M06" />} />
        <Route path={RUTAS.ingreso} element={<Marcador nombre="Iniciar sesion" modulo="M01" />} />
        <Route path={RUTAS.registro} element={<Marcador nombre="Registro" modulo="M01" />} />
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
