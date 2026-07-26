import { useSitios } from '@/features/catalogo/hooks/useSitios';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import estilos from './DescubrirPage.module.css';

/**
 * Seccion Descubrir del sistema.
 *
 * Por ahora lista el catalogo completo (RF-08). Los filtros por provincia,
 * actividad, presupuesto y tiempo (RF-15 a RF-21) y el mapa (RF-24) se
 * integran sobre esta misma pagina en los siguientes requerimientos.
 */
export default function DescubrirPage() {
  const { sitios, cargando, error } = useSitios();

  return (
    <main className={estilos.pagina}>
      <header className={estilos.encabezado}>
        <h1 className={estilos.titulo}>Descubre Costa Rica</h1>
        <p className={estilos.subtitulo}>
          Explora sitios turísticos de todo el país, desde los destinos más conocidos hasta lugares
          que pocos han visitado.
        </p>
      </header>

      {!cargando && !error && (
        <p className={estilos.conteo}>
          {sitios.length} {sitios.length === 1 ? 'sitio disponible' : 'sitios disponibles'}
        </p>
      )}

      <ListaSitios sitios={sitios} cargando={cargando} error={error} />
    </main>
  );
}
