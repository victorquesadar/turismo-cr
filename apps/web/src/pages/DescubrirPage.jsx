import { useSitios } from '@/features/catalogo/hooks/useSitios';
import { useFiltros } from '@/features/catalogo/hooks/useFiltros';
import PanelFiltros from '@/features/catalogo/components/PanelFiltros';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import estilos from './DescubrirPage.module.css';

/**
 * Seccion Descubrir del sistema.
 *
 * Lista el catalogo (RF-08) y permite filtrarlo por provincia, actividad,
 * presupuesto, tiempo, accesibilidad y texto (RF-15 a RF-23). El filtrado
 * ocurre en el cliente sobre la lista ya cargada.
 *
 * El mapa (RF-24) se integra sobre esta misma pagina mas adelante.
 */
export default function DescubrirPage() {
  const { sitios, cargando, error } = useSitios();
  const { filtros, actualizar, limpiar, sitiosFiltrados, hayFiltrosActivos } = useFiltros(sitios);

  const mostrarConteo = !cargando && !error;

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
    </main>
  );
}
