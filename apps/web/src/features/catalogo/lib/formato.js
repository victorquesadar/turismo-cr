import { RANGOS_PRESUPUESTO, DURACIONES } from '@turismo/shared';

/** Devuelve el simbolo de precio correspondiente al rango. */
export function simboloPresupuesto(codigo) {
  return RANGOS_PRESUPUESTO.find((r) => r.codigo === codigo)?.simbolo ?? '';
}

/** Devuelve el nombre legible de la duracion estimada. */
export function nombreDuracion(codigo) {
  return DURACIONES.find((d) => d.codigo === codigo)?.nombre ?? codigo;
}

/** Recorta la descripcion para que las tarjetas mantengan altura pareja. */
export function resumir(texto, limite = 120) {
  if (texto.length <= limite) return texto;
  return `${texto.slice(0, limite).trimEnd()}…`;
}
