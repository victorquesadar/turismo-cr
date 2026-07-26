import L from 'leaflet';

/**
 * Leaflet resuelve mal las rutas de sus iconos por defecto cuando se usa
 * con un empaquetador como Vite. Se define un icono propio para evitarlo.
 */
export const iconoSitio = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 22px;
      height: 22px;
      background: #1f6f4a;
      border: 3px solid #fff;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    "></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -20],
});
