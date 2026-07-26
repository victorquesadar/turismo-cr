import TarjetaSitio from './TarjetaSitio';
import estilos from './ListaSitios.module.css';

/**
 * Rejilla de tarjetas del catalogo (RF-08).
 *
 * Distingue los tres estados de carga para dar retroalimentacion
 * visual en todos los casos (RNF-03) y cubre el resultado vacio (RF-23).
 */
export default function ListaSitios({ sitios, cargando, error }) {
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
    // RF-23: informar y sugerir ampliar criterios.
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
