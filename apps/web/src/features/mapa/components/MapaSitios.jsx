import { MapContainer, TileLayer } from 'react-leaflet';
import MarcadorSitio from './MarcadorSitio';
import AjustarLimites from './AjustarLimites';
import estilos from './MapaSitios.module.css';
import 'leaflet/dist/leaflet.css';

// Centro aproximado de Costa Rica, usado como vista inicial.
const CENTRO_CR = [9.7489, -83.7534];
const ZOOM_INICIAL = 7;

/**
 * Mapa interactivo de la seccion Descubrir (RF-24 a RF-28).
 *
 * Muestra un marcador por cada sitio recibido. Como recibe la lista ya
 * filtrada, los marcadores quedan sincronizados con los filtros (RF-25).
 * Usa Leaflet con teselas de OpenStreetMap: sin llave ni cuota.
 */
export default function MapaSitios({ sitios }) {
  return (
    <div className={estilos.contenedor}>
      <MapContainer
        center={CENTRO_CR}
        zoom={ZOOM_INICIAL}
        scrollWheelZoom={false}
        className={estilos.mapa}
      >
        {/* RF-28: controles de navegacion incluidos por defecto en Leaflet */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sitios.map((sitio) => (
          <MarcadorSitio key={sitio.id} sitio={sitio} />
        ))}

        <AjustarLimites sitios={sitios} />
      </MapContainer>
    </div>
  );
}
