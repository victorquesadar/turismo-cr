import { PROVINCIAS, TIPOS_ACTIVIDAD, RANGOS_PRESUPUESTO } from '@turismo/shared';
import estilos from './PreferenciasDetectadas.module.css';

/**
 * Muestra los criterios que el asistente detecto en la ultima consulta (RF-41).
 */
export default function PreferenciasDetectadas({ criterios }) {
  if (!criterios) return null;

  const nombreProvincia = PROVINCIAS.find((p) => p.codigo === criterios.provincia)?.nombre;
  const nombreActividad = TIPOS_ACTIVIDAD.find((a) => a.codigo === criterios.actividad)?.nombre;
  const nombrePresupuesto = RANGOS_PRESUPUESTO.find((r) => r.codigo === criterios.presupuesto)?.nombre;

  const detectadas = [
    nombreProvincia && { etiqueta: 'Provincia', valor: nombreProvincia },
    nombreActividad && { etiqueta: 'Actividad', valor: nombreActividad },
    nombrePresupuesto && { etiqueta: 'Presupuesto', valor: nombrePresupuesto },
    criterios.accesible && { etiqueta: 'Accesibilidad', valor: 'Requerida' },
  ].filter(Boolean);

  if (detectadas.length === 0) return null;

  return (
    <div className={estilos.panel}>
      <h3 className={estilos.titulo}>Preferencias detectadas</h3>
      <ul className={estilos.lista}>
        {detectadas.map((p) => (
          <li key={p.etiqueta} className={estilos.item}>
            <span className={estilos.etiqueta}>{p.etiqueta}</span>
            <span className={estilos.valor}>{p.valor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
