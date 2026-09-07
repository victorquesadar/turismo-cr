import L from 'leaflet';

/**
 * Leaflet resuelve mal las rutas de sus iconos por defecto cuando se usa
 * con un empaquetador como Vite. Se define un icono propio para evitarlo.
 */
export const iconoSitio = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 24px;
      height: 24px;
      background: #ff4757;
      border: 3px solid #fff;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 3px 8px rgba(48, 24, 18, 0.5);
    "></div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -22],
});
