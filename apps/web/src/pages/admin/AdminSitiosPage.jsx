import { Link } from 'react-router-dom';
import { useListaAdmin } from '@/features/administracion/hooks/useListaAdmin';
import { cambiarEstado, eliminarSitio } from '@/features/administracion/services/adminService';
import { RUTAS } from '@/lib/rutas';
import estilos from './AdminSitiosPage.module.css';

const ETIQUETA_ESTADO = {
  borrador: 'Borrador',
  publicado: 'Publicado',
  archivado: 'Archivado',
};

/** RF-56, RF-62: panel con todos los sitios y sus acciones. */
export default function AdminSitiosPage() {
  const { sitios, cargando, error, recargar } = useListaAdmin();

  const resumen = sitios.reduce(
    (acumulado, sitio) => {
      acumulado[sitio.estado] = (acumulado[sitio.estado] ?? 0) + 1;
      return acumulado;
    },
    { publicado: 0, borrador: 0, archivado: 0 }
  );

  const alternarPublicacion = async (sitio) => {
    const nuevo = sitio.estado === 'publicado' ? 'borrador' : 'publicado';
    await cambiarEstado(sitio.id, nuevo);
    recargar();
  };

  const confirmarEliminar = async (sitio) => {
    if (!window.confirm(`¿Eliminar "${sitio.nombre}"? Esta acción no se puede deshacer.`)) return;
    await eliminarSitio(sitio.id);
    recargar();
  };

  return (
    <main className={estilos.pagina}>
      <Link to={RUTAS.inicio} className={estilos.volver}>← Volver al inicio</Link>

      <header className={estilos.encabezado}>
        <div>
          <h1 className={estilos.titulo}>Administración del catálogo</h1>
          <p className={estilos.resumen}>
            {resumen.publicado} publicados · {resumen.borrador} borradores ·{' '}
            {resumen.archivado} archivados
          </p>
        </div>
        <Link to={RUTAS.adminNuevo} className={estilos.botonNuevo}>
          + Nuevo sitio
        </Link>
      </header>

      {cargando && <p className={estilos.mensaje}>Cargando…</p>}
      {error && <p className={estilos.mensaje} role="alert">{error}</p>}

      {!cargando && !error && (
        <div className={estilos.tablaContenedor}>
          <table className={estilos.tabla}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Provincia</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th className={estilos.acciones}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sitios.map((sitio) => (
                <tr key={sitio.id}>
                  <td>{sitio.nombre}</td>
                  <td>{sitio.provincia?.nombre ?? '—'}</td>
                  <td>{sitio.categoria?.nombre ?? '—'}</td>
                  <td>
                    <span className={`${estilos.estado} ${estilos[sitio.estado]}`}>
                      {ETIQUETA_ESTADO[sitio.estado]}
                    </span>
                  </td>
                  <td className={estilos.acciones}>
                    <button
                      type="button"
                      className={estilos.accionTexto}
                      onClick={() => alternarPublicacion(sitio)}
                    >
                      {sitio.estado === 'publicado' ? 'Despublicar' : 'Publicar'}
                    </button>
                    <Link
                      to={RUTAS.adminEditar.replace(':id', sitio.id)}
                      className={estilos.accionTexto}
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className={`${estilos.accionTexto} ${estilos.peligro}`}
                      onClick={() => confirmarEliminar(sitio)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {sitios.length === 0 && (
                <tr>
                  <td colSpan={5} className={estilos.vacio}>
                    No hay sitios registrados. Creá el primero.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
