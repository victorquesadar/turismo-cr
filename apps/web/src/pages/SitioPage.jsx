import { useParams, Link } from 'react-router-dom';
import { useSitio } from '@/features/catalogo/hooks/useSitio';
import GaleriaSitio from '@/features/catalogo/components/GaleriaSitio';
import UbicacionSitio from '@/features/catalogo/components/UbicacionSitio';
import { simboloPresupuesto, nombreDuracion } from '@/features/catalogo/lib/formato';
import { RUTAS } from '@/lib/rutas';
import estilos from './SitioPage.module.css';

/**
 * Ficha de detalle de un sitio turistico (RF-09 a RF-13).
 */
export default function SitioPage() {
  const { id } = useParams();
  const { sitio, cargando, error, noEncontrado } = useSitio(id);

  if (cargando) {
    return (
      <main className={estilos.pagina}>
        <div className={estilos.esqueleto} aria-busy="true" />
      </main>
    );
  }

  if (error) {
    return (
      <main className={estilos.pagina}>
        <p className={estilos.mensaje} role="alert">{error}</p>
        <Link to={RUTAS.inicio} className={estilos.volver}>← Volver al inicio</Link>
      </main>
    );
  }

  if (noEncontrado) {
    return (
      <main className={estilos.pagina}>
        <p className={estilos.mensaje}>Este sitio turístico no está disponible.</p>
        <Link to={RUTAS.inicio} className={estilos.volver}>← Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main className={estilos.pagina}>
      <Link to={RUTAS.inicio} className={estilos.volver}>← Volver</Link>

      <div className={estilos.contenido}>
        <div className={estilos.principal}>
          <GaleriaSitio imagenes={sitio.imagenes} nombre={sitio.nombre} />

          <div className={estilos.encabezado}>
            <p className={estilos.ubicacion}>
              {sitio.provincia?.nombre}
              {sitio.canton ? `, ${sitio.canton}` : ''}
              {sitio.categoria ? ` · ${sitio.categoria.nombre}` : ''}
            </p>
            <h1 className={estilos.titulo}>{sitio.nombre}</h1>

            <div className={estilos.distintivos}>
              {sitio.esAccesible && <span className={estilos.distintivo}>Accesible</span>}
              {sitio.esPocoConocido && (
                <span className={`${estilos.distintivo} ${estilos.destacado}`}>Poco conocido</span>
              )}
            </div>
          </div>

          <p className={estilos.descripcion}>{sitio.descripcion}</p>

          {sitio.etiquetas.length > 0 && (
            <ul className={estilos.etiquetas}>
              {sitio.etiquetas.map((etiqueta) => (
                <li key={etiqueta} className={estilos.etiqueta}>{etiqueta}</li>
              ))}
            </ul>
          )}
        </div>

        <aside className={estilos.lateral}>
          <dl className={estilos.datos}>
            <div className={estilos.dato}>
              <dt>Presupuesto</dt>
              <dd>{simboloPresupuesto(sitio.presupuesto)}</dd>
            </div>
            <div className={estilos.dato}>
              <dt>Tiempo estimado</dt>
              <dd>{nombreDuracion(sitio.duracion)}</dd>
            </div>
            {sitio.temporada && (
              <div className={estilos.dato}>
                <dt>Mejor temporada</dt>
                <dd>{sitio.temporada}</dd>
              </div>
            )}
            <div className={estilos.dato}>
              <dt>Accesibilidad</dt>
              <dd>{sitio.esAccesible ? 'Apto para movilidad reducida' : 'No especificada'}</dd>
            </div>
          </dl>

          <UbicacionSitio
            latitud={sitio.latitud}
            longitud={sitio.longitud}
            direccion={sitio.direccion}
          />
        </aside>
      </div>
    </main>
  );
}
