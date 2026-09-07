import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { iconoSitio } from '@/features/mapa/lib/iconos';
import estilos from './UbicacionSitio.module.css';
import 'leaflet/dist/leaflet.css';

/**
 * Mapa reducido con la ubicacion exacta del sitio (RF-11).
 */
export default function UbicacionSitio({ latitud, longitud, direccion }) {
  return (
    <div className={estilos.bloque}>
      <div className={estilos.mapa}>
        <MapContainer
          center={[latitud, longitud]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitud, longitud]} icon={iconoSitio} />
        </MapContainer>
      </div>
      {direccion && <p className={estilos.direccion}>{direccion}</p>}
      <div className={estilos.acciones}>
        <a
          className={estilos.botonRuta}
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imagenes/GoogleMaps.png" alt="Abrir en Google Maps" />
          <span>Google Maps</span>
        </a>
        <a
          className={estilos.botonRuta}
          href={`https://www.waze.com/ul?ll=${latitud}%2C${longitud}&navigate=yes`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imagenes/waze.png" alt="Abrir en Waze" />
          <span>Waze</span>
        </a>
      </div>
    </div>
  );
}
