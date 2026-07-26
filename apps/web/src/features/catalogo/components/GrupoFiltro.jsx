import estilos from './GrupoFiltro.module.css';

/**
 * Grupo de opciones excluyentes en forma de pastillas.
 * Reutilizado por todos los filtros de un solo valor (RF-15 a RF-18).
 *
 * @param {string} etiqueta   titulo del grupo
 * @param {Array}  opciones   [{ codigo, nombre }]
 * @param {string} valor      codigo seleccionado actualmente
 * @param {Function} onCambio (codigo) => void
 */
export default function GrupoFiltro({ etiqueta, opciones, valor, onCambio }) {
  return (
    <fieldset className={estilos.grupo}>
      <legend className={estilos.etiqueta}>{etiqueta}</legend>
      <div className={estilos.opciones}>
        {opciones.map((opcion) => {
          const activa = opcion.codigo === valor;
          return (
            <button
              key={opcion.codigo}
              type="button"
              className={`${estilos.pastilla} ${activa ? estilos.activa : ''}`}
              aria-pressed={activa}
              onClick={() => onCambio(opcion.codigo)}
            >
              {opcion.nombre}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
