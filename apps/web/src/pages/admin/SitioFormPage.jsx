import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  crearSitio,
  actualizarSitio,
  obtenerSitioParaEditar,
  cargarCatalogos,
} from '@/features/administracion/services/adminService';
import GestorImagenes from '@/features/administracion/components/GestorImagenes';
import { RANGOS_PRESUPUESTO, DURACIONES } from '@turismo/shared';
import { RUTAS } from '@/lib/rutas';
import estilos from './SitioFormPage.module.css';

const VACIO = {
  nombre: '',
  descripcion: '',
  latitud: '',
  longitud: '',
  direccion: '',
  canton: '',
  temporada_recomendada: '',
  provincia_id: '',
  categoria_id: '',
  presupuesto: 'medio',
  duracion: 'un-dia',
  es_accesible: false,
  es_poco_conocido: false,
  estado: 'borrador',
};

/** RF-53, RF-54: formulario para crear o editar un sitio. */
export default function SitioFormPage() {
  const { id } = useParams();
  const navegar = useNavigate();
  const editando = Boolean(id);

  const [datos, setDatos] = useState(VACIO);
  const [catalogos, setCatalogos] = useState({ provincias: [], categorias: [] });
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarCatalogos().then(setCatalogos);
  }, []);

  useEffect(() => {
    if (!editando) return;
    obtenerSitioParaEditar(id)
      .then((sitio) => {
        setDatos({
          ...sitio,
          latitud: String(sitio.latitud),
          longitud: String(sitio.longitud),
          direccion: sitio.direccion ?? '',
          canton: sitio.canton ?? '',
          temporada_recomendada: sitio.temporada_recomendada ?? '',
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [id, editando]);

  const actualizar = (campo, valor) => setDatos((d) => ({ ...d, [campo]: valor }));

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    const payload = {
      ...datos,
      latitud: Number(datos.latitud),
      longitud: Number(datos.longitud),
    };

    try {
      if (editando) {
        await actualizarSitio(id, payload);
        navegar(RUTAS.admin);
      } else {
        const nuevoId = await crearSitio(payload);
        // Tras crear, se va a la edicion para poder subir imagenes.
        navegar(RUTAS.adminEditar.replace(':id', nuevoId));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <main className={estilos.pagina}><p>Cargando…</p></main>;

  return (
    <main className={estilos.pagina}>
      <button type="button" className={estilos.volver} onClick={() => navegar(RUTAS.admin)}>
        ← Volver al catálogo
      </button>

      <h1 className={estilos.titulo}>{editando ? 'Editar sitio' : 'Nuevo sitio'}</h1>

      <form className={estilos.formulario} onSubmit={manejarEnvio}>
        <label className={estilos.campo}>
          <span>Nombre</span>
          <input value={datos.nombre} onChange={(e) => actualizar('nombre', e.target.value)} required />
        </label>

        <label className={estilos.campo}>
          <span>Descripción</span>
          <textarea
            rows={4}
            value={datos.descripcion}
            onChange={(e) => actualizar('descripcion', e.target.value)}
            required
          />
        </label>

        <div className={estilos.fila}>
          <label className={estilos.campo}>
            <span>Latitud</span>
            <input
              type="number"
              step="any"
              value={datos.latitud}
              onChange={(e) => actualizar('latitud', e.target.value)}
              required
            />
          </label>
          <label className={estilos.campo}>
            <span>Longitud</span>
            <input
              type="number"
              step="any"
              value={datos.longitud}
              onChange={(e) => actualizar('longitud', e.target.value)}
              required
            />
          </label>
        </div>

        <div className={estilos.fila}>
          <label className={estilos.campo}>
            <span>Provincia</span>
            <select
              value={datos.provincia_id}
              onChange={(e) => actualizar('provincia_id', e.target.value)}
              required
            >
              <option value="">Seleccionar…</option>
              {catalogos.provincias.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </label>
          <label className={estilos.campo}>
            <span>Cantón</span>
            <input value={datos.canton} onChange={(e) => actualizar('canton', e.target.value)} />
          </label>
        </div>

        <div className={estilos.fila}>
          <label className={estilos.campo}>
            <span>Categoría</span>
            <select
              value={datos.categoria_id}
              onChange={(e) => actualizar('categoria_id', e.target.value)}
              required
            >
              <option value="">Seleccionar…</option>
              {catalogos.categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </label>
          <label className={estilos.campo}>
            <span>Presupuesto</span>
            <select value={datos.presupuesto} onChange={(e) => actualizar('presupuesto', e.target.value)}>
              {RANGOS_PRESUPUESTO.map((r) => (
                <option key={r.codigo} value={r.codigo}>{r.nombre}</option>
              ))}
            </select>
          </label>
        </div>

        <div className={estilos.fila}>
          <label className={estilos.campo}>
            <span>Duración</span>
            <select value={datos.duracion} onChange={(e) => actualizar('duracion', e.target.value)}>
              {DURACIONES.map((d) => (
                <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
              ))}
            </select>
          </label>
          <label className={estilos.campo}>
            <span>Temporada recomendada</span>
            <input
              value={datos.temporada_recomendada}
              onChange={(e) => actualizar('temporada_recomendada', e.target.value)}
              placeholder="Ej: Diciembre a abril"
            />
          </label>
        </div>

        <label className={estilos.campo}>
          <span>Dirección de referencia</span>
          <input value={datos.direccion} onChange={(e) => actualizar('direccion', e.target.value)} />
        </label>

        <div className={estilos.casillas}>
          <label className={estilos.casilla}>
            <input
              type="checkbox"
              checked={datos.es_accesible}
              onChange={(e) => actualizar('es_accesible', e.target.checked)}
            />
            Accesible para movilidad reducida
          </label>
          <label className={estilos.casilla}>
            <input
              type="checkbox"
              checked={datos.es_poco_conocido}
              onChange={(e) => actualizar('es_poco_conocido', e.target.checked)}
            />
            Lugar poco conocido
          </label>
        </div>

        <label className={estilos.campo}>
          <span>Estado</span>
          <select value={datos.estado} onChange={(e) => actualizar('estado', e.target.value)}>
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
            <option value="archivado">Archivado</option>
          </select>
        </label>

        {error && <p className={estilos.error} role="alert">{error}</p>}

        <button type="submit" className={estilos.guardar} disabled={guardando}>
          {guardando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Crear y continuar'}
        </button>
      </form>

      {editando && (
        <section className={estilos.imagenes}>
          <h2 className={estilos.subtitulo}>Imágenes</h2>
          <GestorImagenes sitioId={id} />
        </section>
      )}
    </main>
  );
}
