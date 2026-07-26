import TarjetaSitio from './TarjetaSitio';
import estilos from './ListaSitios.module.css';

/**
 * Rejilla de tarjetas del catalogo (RF-08).
 *
 * Distingue los estados de carga (RNF-03) y separa el resultado vacio por
 * ausencia de datos del resultado vacio por filtros (RF-23).
 */
export default function ListaSitios({
  sitios,
  cargando,
  error,
  hayFiltrosActivos = false,
  onLimpiar,
}) {
  if (cargando) {
    return (
      <div className={estilos.rejilla} aria-busy="true" aria-live="polite">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={estilos.esqueleto} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className={estilos.mensaje} role="alert">
        {error}
      </p>
    );
  }

  if (sitios.length === 0) {
    // RF-23: si el vacio proviene de los filtros, se sugiere ampliarlos.
    if (hayFiltrosActivos) {
      return (
        <div className={estilos.mensaje}>
          <p>Ningún sitio coincide con los filtros seleccionados.</p>
          {onLimpiar && (
            <button type="button" className={estilos.accion} onClick={onLimpiar}>
              Limpiar filtros
            </button>
          )}
        </div>
      );
    }
    return <p className={estilos.mensaje}>No hay sitios turísticos disponibles por el momento.</p>;
  }

  return (
    <div className={estilos.rejilla}>
      {sitios.map((sitio) => (
        <TarjetaSitio key={sitio.id} sitio={sitio} />
      ))}
    </div>
  );
}
