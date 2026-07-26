import { useState } from 'react';
import estilos from './GaleriaSitio.module.css';

/**
 * Galeria de imagenes de la ficha (RF-10).
 * Muestra una imagen principal y miniaturas navegables.
 * Si el sitio no tiene imagenes, muestra un marcador visual.
 */
export default function GaleriaSitio({ imagenes, nombre }) {
  const [activa, setActiva] = useState(0);

  if (!imagenes || imagenes.length === 0) {
    return <div className={estilos.ausente} aria-hidden="true" />;
  }

  const principal = imagenes[activa];

  return (
    <div className={estilos.galeria}>
      <img
        className={estilos.principal}
        src={principal.url}
        alt={principal.texto_alternativo ?? nombre}
      />

      {imagenes.length > 1 && (
        <div className={estilos.miniaturas}>
          {imagenes.map((imagen, i) => (
            <button
              key={i}
              type="button"
              className={`${estilos.miniatura} ${i === activa ? estilos.activa : ''}`}
              onClick={() => setActiva(i)}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <img src={imagen.url} alt={imagen.texto_alternativo ?? ''} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
