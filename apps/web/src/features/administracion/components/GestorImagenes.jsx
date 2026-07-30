import { useEffect, useState } from 'react';
import {
  listarImagenes,
  subirImagen,
  eliminarImagen,
} from '../services/imagenesService';
import estilos from './GestorImagenes.module.css';

/** RF-55: subir, ver y eliminar imagenes de un sitio. */
export default function GestorImagenes({ sitioId }) {
  const [imagenes, setImagenes] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState(null);

  const recargar = () => {
    listarImagenes(sitioId).then(setImagenes).catch((e) => setError(e.message));
  };

  useEffect(() => {
    recargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sitioId]);

  const manejarSubida = async (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setSubiendo(true);
    setError(null);
    try {
      await subirImagen(sitioId, archivo, imagenes.length);
      recargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubiendo(false);
      e.target.value = '';
    }
  };

  const manejarEliminar = async (imagenId) => {
    await eliminarImagen(imagenId);
    recargar();
  };

  return (
    <div className={estilos.gestor}>
      <div className={estilos.miniaturas}>
        {imagenes.map((imagen) => (
          <div key={imagen.id} className={estilos.miniatura}>
            <img src={imagen.url} alt={imagen.texto_alternativo ?? ''} />
            <button
              type="button"
              className={estilos.eliminar}
              onClick={() => manejarEliminar(imagen.id)}
              aria-label="Eliminar imagen"
            >
              ×
            </button>
          </div>
        ))}

        <label className={estilos.subir}>
          <input type="file" accept="image/*" onChange={manejarSubida} disabled={subiendo} hidden />
          {subiendo ? 'Subiendo…' : '+ Agregar'}
        </label>
      </div>

      {error && <p className={estilos.error} role="alert">{error}</p>}
    </div>
  );
}
