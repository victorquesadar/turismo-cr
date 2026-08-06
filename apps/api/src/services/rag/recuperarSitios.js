import { supabaseAdmin } from '../supabaseAdmin.js';

/**
 * Recupera del catalogo los sitios que cumplen los criterios (RF-42).
 *
 * Esta es la pieza central del patron RAG: el modelo NO decide que lugares
 * existen; la base de datos devuelve los sitios reales y publicados, y solo
 * esos se le entregaran al modelo como contexto.
 */
export async function recuperarSitios(criterios) {
  let consulta = supabaseAdmin
    .from('sitios_turisticos')
    .select(`
      id, nombre, descripcion, presupuesto, duracion,
      es_accesible, es_poco_conocido,
      provincia:provincias ( codigo, nombre ),
      categoria:categorias ( codigo, nombre )
    `)
    .eq('estado', 'publicado');

  if (criterios.provincia) {
    const { data: prov } = await supabaseAdmin
      .from('provincias')
      .select('id')
      .eq('codigo', criterios.provincia)
      .maybeSingle();
    if (prov) consulta = consulta.eq('provincia_id', prov.id);
  }

  if (criterios.actividad) {
    const { data: cat } = await supabaseAdmin
      .from('categorias')
      .select('id')
      .eq('codigo', criterios.actividad)
      .maybeSingle();
    if (cat) consulta = consulta.eq('categoria_id', cat.id);
  }

  if (criterios.presupuesto) consulta = consulta.eq('presupuesto', criterios.presupuesto);
  if (criterios.accesible) consulta = consulta.eq('es_accesible', true);
  if (criterios.texto) {
    consulta = consulta.or(
      `nombre.ilike.%${criterios.texto}%,descripcion.ilike.%${criterios.texto}%`
    );
  }

  const { data, error } = await consulta.limit(8);

  if (error) {
    console.error('Error al recuperar sitios:', error.message);
    return [];
  }
  return data ?? [];
}
