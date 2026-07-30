import { supabase } from '@/services/supabaseClient';

/**
 * Operaciones de administracion del catalogo (RF-53 a RF-57).
 * Las politicas RLS restringen estas operaciones al rol administrador;
 * el frontend solo muestra la interfaz, pero la seguridad real esta en
 * la base de datos (RNF-14).
 */

/** Lista todos los sitios, incluidos borradores y archivados (RF-56). */
export async function listarTodosLosSitios() {
  const { data, error } = await supabase
    .from('sitios_turisticos')
    .select(`
      id, nombre, estado, es_accesible, es_poco_conocido,
      provincia:provincias ( nombre ),
      categoria:categorias ( nombre )
    `)
    .order('creado_en', { ascending: false });

  if (error) {
    console.error('Error al listar sitios:', error.message);
    throw new Error('No fue posible cargar los sitios.');
  }
  return data;
}

/** Obtiene un sitio con todos sus campos para editarlo. */
export async function obtenerSitioParaEditar(id) {
  const { data, error } = await supabase
    .from('sitios_turisticos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener el sitio:', error.message);
    throw new Error('No fue posible cargar el sitio.');
  }
  return data;
}

/** RF-53: crea un sitio nuevo. */
export async function crearSitio(datos) {
  const { data, error } = await supabase
    .from('sitios_turisticos')
    .insert(datos)
    .select('id')
    .single();

  if (error) {
    console.error('Error al crear el sitio:', error.message);
    throw new Error('No fue posible crear el sitio.');
  }
  return data.id;
}

/** RF-54: actualiza un sitio existente. */
export async function actualizarSitio(id, datos) {
  const { error } = await supabase
    .from('sitios_turisticos')
    .update({ ...datos, actualizado_en: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error al actualizar el sitio:', error.message);
    throw new Error('No fue posible actualizar el sitio.');
  }
}

/** RF-54: elimina un sitio. */
export async function eliminarSitio(id) {
  const { error } = await supabase.from('sitios_turisticos').delete().eq('id', id);
  if (error) {
    console.error('Error al eliminar el sitio:', error.message);
    throw new Error('No fue posible eliminar el sitio.');
  }
}

/** RF-56: cambia el estado de publicacion de un sitio. */
export async function cambiarEstado(id, estado) {
  const { error } = await supabase
    .from('sitios_turisticos')
    .update({ estado, actualizado_en: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error al cambiar el estado:', error.message);
    throw new Error('No fue posible cambiar el estado.');
  }
}

/** Carga los catalogos de provincias y categorias para el formulario. */
export async function cargarCatalogos() {
  const [provincias, categorias] = await Promise.all([
    supabase.from('provincias').select('id, nombre').order('nombre'),
    supabase.from('categorias').select('id, nombre').order('nombre'),
  ]);
  return {
    provincias: provincias.data ?? [],
    categorias: categorias.data ?? [],
  };
}
