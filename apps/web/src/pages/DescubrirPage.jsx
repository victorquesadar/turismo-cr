import { useSitios } from '@/features/catalogo/hooks/useSitios';
import { useFiltros } from '@/features/catalogo/hooks/useFiltros';
import PanelFiltros from '@/features/catalogo/components/PanelFiltros';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import MapaSitios from '@/features/mapa/components/MapaSitios';
import estilos from './DescubrirPage.module.css';

/**
 * Seccion Descubrir del sistema.
 *
 * Lista el catalogo (RF-08), permite filtrarlo (RF-15 a RF-23) y lo muestra
 * en un mapa interactivo (RF-24 a RF-28). El mapa recibe la misma lista
 * filtrada que las tarjetas, por lo que ambos quedan sincronizados.
 *
 * Distribucion: tarjetas a la izquierda, mapa fijo a la derecha. En pantallas
 * angostas se apilan, con el mapa arriba.
 */
export default function DescubrirPage() {
  const { sitios, cargando, error } = useSitios();
  const { filtros, actualizar, limpiar, sitiosFiltrados, hayFiltrosActivos } = useFiltros(sitios);

  const mostrarConteo = !cargando && !error;
  const hayMapa = !cargando && !error && sitiosFiltrados.length > 0;

  return (
    <main className={estilos.pagina}>
      <header className={estilos.encabezado}>
        <h1 className={estilos.titulo}>Descubre Costa Rica</h1>
        <p className={estilos.subtitulo}>
          Explora sitios turísticos de todo el país, desde los destinos más conocidos
          hasta lugares que pocos han visitado.
        </p>
      </header>

      <PanelFiltros
        filtros={filtros}
        actualizar={actualizar}
        limpiar={limpiar}
        hayFiltrosActivos={hayFiltrosActivos}
      />

      <div className={estilos.contenido}>
        <div className={estilos.columnaLista}>
          {mostrarConteo && (
            <p className={estilos.conteo}>
              {sitiosFiltrados.length}{' '}
              {sitiosFiltrados.length === 1 ? 'sitio encontrado' : 'sitios encontrados'}
            </p>
          )}

          <ListaSitios
            sitios={sitiosFiltrados}
            cargando={cargando}
            error={error}
            hayFiltrosActivos={hayFiltrosActivos}
            onLimpiar={limpiar}
          />
        </div>

        {hayMapa && (
          <aside className={estilos.columnaMapa}>
            <MapaSitios sitios={sitiosFiltrados} />
          </aside>
        )}
      </div>
    </main>
  );
}
