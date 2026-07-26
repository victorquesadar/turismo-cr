import { useMemo, useState } from 'react';

/** Estado inicial de los filtros. 'todas'/'todos' significa sin filtrar. */
const FILTROS_INICIALES = {
  provincia: 'todas',
  actividad: 'todas',
  presupuesto: 'todos',
  duracion: 'todas',
  soloAccesibles: false,
  texto: '',
};

/**
 * Aplica los filtros del catalogo en el cliente (RF-15 a RF-23).
 *
 * Recibe la lista completa de sitios y devuelve la lista filtrada segun
 * los criterios activos, mas los controladores para modificarlos.
 */
export function useFiltros(sitios) {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const actualizar = (clave, valor) => {
    setFiltros((previo) => ({ ...previo, [clave]: valor }));
  };

  const limpiar = () => setFiltros(FILTROS_INICIALES);

  const sitiosFiltrados = useMemo(() => {
    const texto = filtros.texto.trim().toLowerCase();

    return sitios.filter((sitio) => {
      // RF-15: provincia
      if (filtros.provincia !== 'todas' && sitio.provincia?.codigo !== filtros.provincia) {
        return false;
      }
      // RF-16: tipo de actividad
      if (filtros.actividad !== 'todas' && sitio.categoria?.codigo !== filtros.actividad) {
        return false;
      }
      // RF-17: presupuesto
      if (filtros.presupuesto !== 'todos' && sitio.presupuesto !== filtros.presupuesto) {
        return false;
      }
      // RF-18: duracion
      if (filtros.duracion !== 'todas' && sitio.duracion !== filtros.duracion) {
        return false;
      }
      // RF-19: solo accesibles
      if (filtros.soloAccesibles && !sitio.esAccesible) {
        return false;
      }
      // RF-21: busqueda por texto en nombre o descripcion
      if (texto) {
        const enNombre = sitio.nombre.toLowerCase().includes(texto);
        const enDescripcion = sitio.descripcion.toLowerCase().includes(texto);
        if (!enNombre && !enDescripcion) return false;
      }
      return true;
    });
  }, [sitios, filtros]);

  // Indica si hay al menos un filtro activo (para mostrar el boton de limpiar).
  const hayFiltrosActivos = useMemo(
    () =>
      filtros.provincia !== 'todas' ||
      filtros.actividad !== 'todas' ||
      filtros.presupuesto !== 'todos' ||
      filtros.duracion !== 'todas' ||
      filtros.soloAccesibles ||
      filtros.texto.trim() !== '',
    [filtros]
  );

  return { filtros, actualizar, limpiar, sitiosFiltrados, hayFiltrosActivos };
}
