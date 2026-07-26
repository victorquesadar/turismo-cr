import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RUTAS } from './lib/rutas';
import DescubrirPage from './pages/DescubrirPage';

/**
 * Punto de entrada de la aplicacion.
 *
 * Las paginas se implementan progresivamente segun el orden definido
 * en la seccion 8.1 del SRS:
 *   Etapa 1 → M02 Catalogo, M03 Filtros, M04 Mapa
 *   Etapa 2 → M01 Autenticacion, M05 Favoritos
 *   Etapa 3 → M07 Administracion
 *   Etapa 4 → M06 Asistente virtual
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RUTAS.inicio} element={<DescubrirPage />} />
        <Route path={RUTAS.mapa} element={<Marcador nombre="Mapa interactivo" modulo="M04" />} />
        <Route path={RUTAS.sitio} element={<Marcador nombre="Ficha del sitio" modulo="M02" />} />
        <Route path={RUTAS.favoritos} element={<Marcador nombre="Mis favoritos" modulo="M05" />} />
        <Route
          path={RUTAS.asistente}
          element={<Marcador nombre="Asistente virtual" modulo="M06" />}
        />
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
