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
    </div>
  );
}
