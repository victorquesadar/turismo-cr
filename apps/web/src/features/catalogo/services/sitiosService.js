import { supabase } from '@/services/supabaseClient';

/**
 * Campos que necesitan la tarjeta del catalogo (RF-08) y el mapa (RF-24).
 */
const CAMPOS_TARJETA = `
  id,
  nombre,
  descripcion,
  latitud,
  longitud,
  presupuesto,
  duracion,
  es_accesible,
  es_poco_conocido,
  provincia:provincias ( codigo, nombre ),
  categoria:categorias ( codigo, nombre ),
  imagenes ( url, texto_alternativo, orden )
`;

/**
 * Campos completos para la ficha de detalle (RF-09 a RF-13).
 * Agrega canton, direccion, temporada y las etiquetas asociadas.
 */
const CAMPOS_FICHA = `
  id,
  nombre,
  descripcion,
  latitud,
  longitud,
  direccion,
  canton,
  temporada_recomendada,
  presupuesto,
  duracion,
  es_accesible,
  es_poco_conocido,
  provincia:provincias ( codigo, nombre ),
  categoria:categorias ( codigo, nombre ),
  imagenes ( url, texto_alternativo, orden ),
  sitio_etiquetas ( etiquetas ( nombre ) )
`;

/**
 * Recupera los sitios turisticos publicados para el catalogo y el mapa.
 * La politica RLS ya restringe el resultado a estado = 'publicado' (RNF-14).
 */
export async function obtenerSitios() {
  const { data, error } = await supabase
    .from('sitios_turisticos')
    .select(CAMPOS_TARJETA)
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al consultar sitios turisticos:', error.message);
    throw new Error('No fue posible cargar los sitios turisticos.');
  }

  return data.map(normalizarSitio);
}

/**
 * Recupera un unico sitio con todos sus datos para la ficha (RF-09).
 *
 * @param {string} id  identificador del sitio
 * @returns {Promise<Object|null>}  el sitio, o null si no existe o no esta publicado
 */
export async function obtenerSitioPorId(id) {
  const { data, error } = await supabase
    .from('sitios_turisticos')
    .select(CAMPOS_FICHA)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error al consultar el sitio:', error.message);
    throw new Error('No fue posible cargar el sitio turistico.');
  }

  if (!data) return null;

  return normalizarFicha(data);
}

/** Aplana un sitio para las tarjetas y el mapa. */
function normalizarSitio(registro) {
  const imagenes = ordenarImagenes(registro.imagenes);

  return {
    id: registro.id,
    nombre: registro.nombre,
    descripcion: registro.descripcion,
    latitud: Number(registro.latitud),
    longitud: Number(registro.longitud),
    presupuesto: registro.presupuesto,
    duracion: registro.duracion,
    esAccesible: registro.es_accesible,
    esPocoConocido: registro.es_poco_conocido,
    provincia: registro.provincia,
    categoria: registro.categoria,
    imagenPrincipal: imagenes[0] ?? null,
  };
}

/** Aplana un sitio completo para la ficha de detalle. */
function normalizarFicha(registro) {
  return {
    id: registro.id,
    nombre: registro.nombre,
    descripcion: registro.descripcion,
    latitud: Number(registro.latitud),
    longitud: Number(registro.longitud),
    direccion: registro.direccion,
    canton: registro.canton,
    temporada: registro.temporada_recomendada,
    presupuesto: registro.presupuesto,
    duracion: registro.duracion,
    esAccesible: registro.es_accesible,
    esPocoConocido: registro.es_poco_conocido,
    provincia: registro.provincia,
    categoria: registro.categoria,
    imagenes: ordenarImagenes(registro.imagenes),
    etiquetas: (registro.sitio_etiquetas ?? [])
      .map((se) => se.etiquetas?.nombre)
      .filter(Boolean),
  };
}

/** Ordena las imagenes por su campo orden. */
function ordenarImagenes(imagenes) {
  return [...(imagenes ?? [])].sort((a, b) => a.orden - b.orden);
}
