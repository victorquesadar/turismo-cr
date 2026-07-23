/** Rutas de la aplicacion. Centralizadas para evitar cadenas dispersas. */
export const RUTAS = {
  inicio: '/',
  mapa: '/mapa',
  sitio: '/sitio/:id',
  favoritos: '/favoritos',
  asistente: '/asistente',
  ingreso: '/ingreso',
  registro: '/registro',
  admin: '/admin',
};

/** Construye la ruta de la ficha de un sitio. */
export function rutaSitio(id) {
  return RUTAS.sitio.replace(':id', id);
}
