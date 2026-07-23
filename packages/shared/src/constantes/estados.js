/** Estados de publicacion de un sitio turistico. RF-56. */
export const ESTADOS_SITIO = {
  BORRADOR: 'borrador',
  PUBLICADO: 'publicado',
  ARCHIVADO: 'archivado',
};

/** Origen del dato de un sitio turistico. RF-61. */
export const ORIGENES_DATO = {
  MANUAL: 'manual',
  GOOGLE_PLACES: 'google_places',
  FUENTE_LOCAL: 'fuente_local',
};

/** Roles de usuario. RF-06. El rol colaborador queda previsto sin implementar. */
export const ROLES = {
  TURISTA: 'turista',
  ADMINISTRADOR: 'administrador',
};
