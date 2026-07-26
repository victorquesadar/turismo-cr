import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { rutaSitio } from '@/lib/rutas';
import { iconoSitio } from '../lib/iconos';
import estilos from './MarcadorSitio.module.css';

/**
 * Marcador de un sitio en el mapa con su ventana emergente (RF-24, RF-26).
 * La ventana muestra imagen, nombre y enlace a la ficha.
 */
export default function MarcadorSitio({ sitio }) {
  return (
    <Marker position={[sitio.latitud, sitio.longitud]} icon={iconoSitio}>
      <Popup>
        <div className={estilos.popup}>
          {sitio.imagenPrincipal && (
            <img
              className={estilos.imagen}
              src={sitio.imagenPrincipal.url}
              alt={sitio.imagenPrincipal.texto_alternativo ?? sitio.nombre}
            />
          )}
          <strong className={estilos.nombre}>{sitio.nombre}</strong>
          <span className={estilos.ubicacion}>{sitio.provincia?.nombre}</span>
          <Link to={rutaSitio(sitio.id)} className={estilos.enlace}>
            Ver detalle
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}
