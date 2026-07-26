import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/**
 * Ajusta el encuadre del mapa para que todos los marcadores visibles
 * queden dentro de la vista (RF-25). Se reejecuta cuando cambia la lista
 * de sitios, es decir, cuando cambian los filtros.
 */
export default function AjustarLimites({ sitios }) {
  const mapa = useMap();

  useEffect(() => {
    if (sitios.length === 0) return;

    const puntos = sitios.map((s) => [s.latitud, s.longitud]);

    if (puntos.length === 1) {
      mapa.setView(puntos[0], 11);
    } else {
      mapa.fitBounds(puntos, { padding: [40, 40], maxZoom: 12 });
    }
  }, [sitios, mapa]);

  return null;
}
