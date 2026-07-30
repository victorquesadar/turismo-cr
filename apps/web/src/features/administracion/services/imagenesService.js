import { supabase } from '@/services/supabaseClient';

const BUCKET = 'sitios';

/**
 * Gestion de imagenes de un sitio (RF-55).
 * Los archivos se guardan en el bucket de Supabase Storage y su referencia
 * en la tabla imagenes.
 */

/** Lista las imagenes de un sitio ordenadas. */
export async function listarImagenes(sitioId) {
  const { data, error } = await supabase
    .from('imagenes')
    .select('id, url, texto_alternativo, orden')
    .eq('sitio_id', sitioId)
    .order('orden');

  if (error) throw new Error('No fue posible cargar las imágenes.');
  return data;
}

/** Sube un archivo al bucket y registra la imagen en la base. */
export async function subirImagen(sitioId, archivo, orden) {
  const extension = archivo.name.split('.').pop();
  const ruta = `${sitioId}/${Date.now()}.${extension}`;

  const { error: errorSubida } = await supabase.storage
    .from(BUCKET)
    .upload(ruta, archivo, { cacheControl: '3600', upsert: false });

  if (errorSubida) {
    console.error('Error al subir la imagen:', errorSubida.message);
    throw new Error('No fue posible subir la imagen.');
  }

  const { data: urlPublica } = supabase.storage.from(BUCKET).getPublicUrl(ruta);

  const { error: errorRegistro } = await supabase.from('imagenes').insert({
    sitio_id: sitioId,
    url: urlPublica.publicUrl,
    orden,
  });

  if (errorRegistro) {
    console.error('Error al registrar la imagen:', errorRegistro.message);
    throw new Error('La imagen se subió pero no se pudo registrar.');
  }

  return urlPublica.publicUrl;
}

/** Elimina el registro de una imagen. */
export async function eliminarImagen(imagenId) {
  const { error } = await supabase.from('imagenes').delete().eq('id', imagenId);
  if (error) throw new Error('No fue posible eliminar la imagen.');
}
