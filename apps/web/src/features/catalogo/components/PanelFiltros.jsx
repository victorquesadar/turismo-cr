import { PROVINCIAS, TIPOS_ACTIVIDAD, RANGOS_PRESUPUESTO, DURACIONES } from '@turismo/shared';
import GrupoFiltro from './GrupoFiltro';
import estilos from './PanelFiltros.module.css';

// Se antepone la opcion "todas/todos" a cada catalogo de opciones.
const opcionesProvincia = [{ codigo: 'todas', nombre: 'Todas' }, ...PROVINCIAS];
const opcionesActividad = [{ codigo: 'todas', nombre: 'Todas' }, ...TIPOS_ACTIVIDAD];
const opcionesPresupuesto = [
  { codigo: 'todos', nombre: 'Todos' },
  ...RANGOS_PRESUPUESTO.map((r) => ({ codigo: r.codigo, nombre: `${r.nombre} (${r.simbolo})` })),
];
const opcionesDuracion = [{ codigo: 'todas', nombre: 'Cualquiera' }, ...DURACIONES];

/**
 * Panel de filtros de la seccion Descubrir (RF-15 a RF-22).
 */
export default function PanelFiltros({ filtros, actualizar, limpiar, hayFiltrosActivos }) {
  return (
    <section className={estilos.panel} aria-label="Filtros de búsqueda">
      <div className={estilos.busqueda}>
        <input
          type="search"
          className={estilos.entrada}
          placeholder="Buscar por nombre o descripción…"
          value={filtros.texto}
          onChange={(e) => actualizar('texto', e.target.value)}
          aria-label="Buscar sitios"
        />
      </div>

      <div className={estilos.grupos}>
        <GrupoFiltro
          etiqueta="Provincia"
          opciones={opcionesProvincia}
          valor={filtros.provincia}
          onCambio={(v) => actualizar('provincia', v)}
        />
        <GrupoFiltro
          etiqueta="Tipo de actividad"
          opciones={opcionesActividad}
          valor={filtros.actividad}
          onCambio={(v) => actualizar('actividad', v)}
        />
        <GrupoFiltro
          etiqueta="Presupuesto"
          opciones={opcionesPresupuesto}
          valor={filtros.presupuesto}
          onCambio={(v) => actualizar('presupuesto', v)}
        />
        <GrupoFiltro
          etiqueta="Tiempo disponible"
          opciones={opcionesDuracion}
          valor={filtros.duracion}
          onCambio={(v) => actualizar('duracion', v)}
        />
      </div>

      <div className={estilos.pie}>
        <label className={estilos.accesible}>
          <input
            type="checkbox"
            checked={filtros.soloAccesibles}
            onChange={(e) => actualizar('soloAccesibles', e.target.checked)}
          />
          Solo lugares accesibles
        </label>

        {hayFiltrosActivos && (
          <button type="button" className={estilos.limpiar} onClick={limpiar}>
            Limpiar filtros
          </button>
        )}
      </div>
    </section>
  );
}
