import { supabase } from '@/services/supabaseClient';

/**
 * Operaciones sobre favoritos (RF-30 a RF-36).
 * Las politicas RLS garantizan que cada persona solo accede a los suyos (RNF-21).
 */

/** Devuelve los IDs de los sitios marcados como favoritos por el usuario. */
export async function obtenerIdsFavoritos() {
  const { data, error } = await supabase.from('favoritos').select('sitio_id');
  if (error) {
    console.error('Error al consultar favoritos:', error.message);
    throw new Error('No fue posible cargar tus favoritos.');
  }
  return data.map((f) => f.sitio_id);
}

/** RF-32: devuelve los sitios favoritos completos para su listado. */
export async function obtenerSitiosFavoritos() {
  const { data, error } = await supabase
    .from('favoritos')
    .select(`
      sitio:sitios_turisticos (
        id, nombre, descripcion, latitud, longitud,
        presupuesto, duracion, es_accesible, es_poco_conocido,
        provincia:provincias ( codigo, nombre ),
        categoria:categorias ( codigo, nombre ),
        imagenes ( url, texto_alternativo, orden )
      )
    `)
    .order('creado_en', { ascending: false });

  if (error) {
    console.error('Error al consultar sitios favoritos:', error.message);
    throw new Error('No fue posible cargar tus favoritos.');
  }

  return data
    .map((f) => f.sitio)
    .filter(Boolean)
    .map((s) => ({
      id: s.id,
      nombre: s.nombre,
      descripcion: s.descripcion,
      latitud: Number(s.latitud),
      longitud: Number(s.longitud),
      presupuesto: s.presupuesto,
      duracion: s.duracion,
      esAccesible: s.es_accesible,
      esPocoConocido: s.es_poco_conocido,
      provincia: s.provincia,
      categoria: s.categoria,
      imagenPrincipal: [...(s.imagenes ?? [])].sort((a, b) => a.orden - b.orden)[0] ?? null,
    }));
}

/** RF-30: marca un sitio como favorito. */
export async function agregarFavorito(sitioId, usuarioId) {
  const { error } = await supabase
    .from('favoritos')
    .insert({ sitio_id: sitioId, usuario_id: usuarioId });
  if (error) {
    console.error('Error al agregar favorito:', error.message);
    throw new Error('No fue posible guardar el favorito.');
  }
}

/** RF-31: quita un sitio de favoritos. */
export async function quitarFavorito(sitioId) {
  const { error } = await supabase.from('favoritos').delete().eq('sitio_id', sitioId);
  if (error) {
    console.error('Error al quitar favorito:', error.message);
    throw new Error('No fue posible quitar el favorito.');
  }
}
