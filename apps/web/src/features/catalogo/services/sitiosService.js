import { supabase } from '@/services/supabaseClient';

/**
 * Campos que necesita la tarjeta del catalogo (RF-08).
 * Se piden explicitamente en lugar de select('*') para no traer columnas
 * que la vista no usa.
 */
const CAMPOS_TARJETA = `
  id,
  nombre,
  descripcion,
  presupuesto,
  duracion,
  es_accesible,
  es_poco_conocido,
  provincia:provincias ( codigo, nombre ),
  categoria:categorias ( codigo, nombre ),
  imagenes ( url, texto_alternativo, orden )
`;

/**
 * Recupera los sitios turisticos publicados.
 *
 * La politica de seguridad a nivel de fila ya restringe el resultado a
 * estado = 'publicado' (RNF-14), por lo que no hace falta filtrarlo aca.
 *
 * @returns {Promise<Array>} sitios listos para renderizar en tarjetas
 */
export async function obtenerSitios() {
  const { data, error } = await supabase
    .from('sitios_turisticos')
    .select(CAMPOS_TARJETA)
    .order('nombre', { ascending: true });

  if (error) {
    // RNF-23: el detalle tecnico se registra, el usuario ve un mensaje claro.
    console.error('Error al consultar sitios turisticos:', error.message);
    throw new Error('No fue posible cargar los sitios turisticos.');
  }

  return data.map(normalizarSitio);
}

/**
 * Aplana la respuesta de Supabase a la forma que consumen los componentes.
 * Las imagenes llegan sin orden garantizado, asi que se ordenan aca.
 */
function normalizarSitio(registro) {
  const imagenes = [...(registro.imagenes ?? [])].sort((a, b) => a.orden - b.orden);

  return {
    id: registro.id,
    nombre: registro.nombre,
    descripcion: registro.descripcion,
    presupuesto: registro.presupuesto,
    duracion: registro.duracion,
    esAccesible: registro.es_accesible,
    esPocoConocido: registro.es_poco_conocido,
    provincia: registro.provincia,
    categoria: registro.categoria,
    imagenPrincipal: imagenes[0] ?? null,
  };
}
