import { Link } from 'react-router-dom';
import { rutaSitio } from '@/lib/rutas';
import { simboloPresupuesto, nombreDuracion, resumir } from '../lib/formato';
import BotonFavorito from '@/features/favoritos/components/BotonFavorito';
import estilos from './TarjetaSitio.module.css';

/**
 * Tarjeta de un sitio turistico en el catalogo (RF-08).
 * Incluye el boton de favorito (RF-30) y los distintivos de
 * accesibilidad (RF-12) y lugar poco conocido (RF-13).
 */
export default function TarjetaSitio({ sitio }) {
  return (
    <article className={estilos.tarjeta}>
      <div className={estilos.contenedorImagen}>
        {sitio.imagenPrincipal ? (
          <img
            className={estilos.imagen}
            src={sitio.imagenPrincipal.url}
            alt={sitio.imagenPrincipal.texto_alternativo ?? sitio.nombre}
            loading="lazy"
          />
        ) : (
          <div className={estilos.imagenAusente} aria-hidden="true" />
        )}

        <div className={estilos.favorito}>
          <BotonFavorito sitioId={sitio.id} />
        </div>

        <div className={estilos.distintivos}>
          {sitio.esAccesible && <span className={estilos.distintivo}>Accesible</span>}
          {sitio.esPocoConocido && (
            <span className={`${estilos.distintivo} ${estilos.distintivoDestacado}`}>
              Poco conocido
            </span>
          )}
        </div>
      </div>

      <div className={estilos.cuerpo}>
        <p className={estilos.ubicacion}>
          {sitio.provincia?.nombre}
          {sitio.categoria ? ` · ${sitio.categoria.nombre}` : ''}
        </p>

        <h3 className={estilos.nombre}>
          <Link to={rutaSitio(sitio.id)} className={estilos.enlace}>
            {sitio.nombre}
          </Link>
        </h3>

        <p className={estilos.descripcion}>{resumir(sitio.descripcion)}</p>

        <ul className={estilos.etiquetas}>
          <li className={estilos.etiqueta}>{simboloPresupuesto(sitio.presupuesto)}</li>
          <li className={estilos.etiqueta}>{nombreDuracion(sitio.duracion)}</li>
        </ul>
      </div>
    </article>
  );
}
