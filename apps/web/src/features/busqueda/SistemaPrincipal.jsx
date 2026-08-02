import { useState } from 'react';
import { useSitios } from '@/features/catalogo/hooks/useSitios';
import { useFiltros } from '@/features/catalogo/hooks/useFiltros';
import PanelFiltros from '@/features/catalogo/components/PanelFiltros';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import MapaSitios from '@/features/mapa/components/MapaSitios';
import estilos from './SistemaPrincipal.module.css';
import { FaSearch } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";

export default function SistemaPrincipal() {
  const { sitios, cargando, error } = useSitios();
  const { filtros, actualizar, limpiar, sitiosFiltrados, hayFiltrosActivos } = useFiltros(sitios);

  const mostrarConteo = !cargando && !error;
  const hayMapa = !cargando && !error && sitiosFiltrados.length > 0;

  // Estado para el asistente (mock)
  const [mensajeUsuario, setMensajeUsuario] = useState('');
  const [conversacion, setConversacion] = useState([
    { tipo: 'asistente', texto: 'Hola, soy tu asistente turístico. ¿Qué tipo de experiencia buscas?' },
  ]);

  const enviarMensaje = () => {
    if (!mensajeUsuario.trim()) return;
    const nuevoMensaje = { tipo: 'usuario', texto: mensajeUsuario };
    setConversacion([...conversacion, nuevoMensaje]);
    setMensajeUsuario('');

    // Respuesta automática (simulación, luego conectar con API)
    setTimeout(() => {
      setConversacion((prev) => [
        ...prev,
        {
          tipo: 'asistente',
          texto: 'Gracias por tu consulta. Te recomiendo explorar los filtros para encontrar sitios que se adapten a tus intereses. ¿Quieres que te ayude con alguna categoría en particular?',
        },
      ]);
    }, 600);
  };

  const sugerencias = [
    'Quiero una escapada de 2 días cerca de San José',
    'Busco playas tranquilas y presupuesto medio',
    'Recomiéndame una ruta con naturaleza y poca caminata',
    '¿Qué visitar si viajo con familia y niños?',
  ];

  return (
    <section className={estilos.sistema}>
      <div className={estilos.contenedor}>
        {/* Encabezado del sistema */}
        <div className={estilos.encabezado}>
          <h2>Centralizamos el turismo en <span className={estilos.destacado}>Costa Rica</span></h2>
        </div>

        {/* Contenido principal: Búsqueda Manual + Asistente */}
        <div className={estilos.columnas}>
          {/* Columna 1: Búsqueda Manual */}
          <div id="busqueda-manual" className={estilos.columnaBusqueda}>
            <div className={estilos.moduloHeader}>
                <FaSearch />
              <h3>Búsqueda Manual</h3>
            </div>
            <PanelFiltros
              filtros={filtros}
              actualizar={actualizar}
              limpiar={limpiar}
              hayFiltrosActivos={hayFiltrosActivos}
            />
            <div className={estilos.contenidoBusqueda}>
              <div className={estilos.columnaLista}>
                {mostrarConteo && (
                  <p className={estilos.conteo}>
                    {sitiosFiltrados.length}{' '}
                    {sitiosFiltrados.length === 1 ? 'sitio encontrado' : 'sitios encontrados'}
                  </p>
                )}
                <ListaSitios
                  sitios={sitiosFiltrados}
                  cargando={cargando}
                  error={error}
                  hayFiltrosActivos={hayFiltrosActivos}
                  onLimpiar={limpiar}
                />
              </div>
              {hayMapa && (
                <aside className={estilos.columnaMapa}>
                  <MapaSitios sitios={sitiosFiltrados} />
                </aside>
              )}
            </div>
          </div>

          {/* Columna 2: Asistente Virtual */}
          <div id="asistente" className={estilos.columnaAsistente}>
            <div className={estilos.moduloHeader}>
              <RiRobot2Fill />
              <h3>Asistente Virtual IA</h3>
              <span className={estilos.badge}>RAG</span>
            </div>
            <div className={estilos.panelAsistente}>
              <div className={estilos.chat}>
                {conversacion.map((msg, idx) => (
                  <div
                    key={idx}
                    className={msg.tipo === 'usuario' ? estilos.burbujaUsuario : estilos.burbujaAsistente}
                  >
                    {msg.texto}
                  </div>
                ))}
              </div>

              <div className={estilos.sugerencias}>
                {sugerencias.map((texto) => (
                  <button
                    key={texto}
                    className={estilos.sugerencia}
                    onClick={() => {
                      setMensajeUsuario(texto);
                      // Opcional: enviar automáticamente
                    }}
                  >
                    {texto}
                  </button>
                ))}
              </div>

              <div className={estilos.inputChat}>
                <input
                  type="text"
                  placeholder="Escribí tu consulta..."
                  value={mensajeUsuario}
                  onChange={(e) => setMensajeUsuario(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                  className={estilos.input}
                />
                <button onClick={enviarMensaje} className={estilos.botonEnviar}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}