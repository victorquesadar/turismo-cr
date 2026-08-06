import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RUTAS } from '@/lib/rutas';
import { useSitios } from '@/features/catalogo/hooks/useSitios';
import { useFiltros } from '@/features/catalogo/hooks/useFiltros';
import PanelFiltros from '@/features/catalogo/components/PanelFiltros';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import MapaSitios from '@/features/mapa/components/MapaSitios';
import estilos from './SistemaPrincipal.module.css';
import { FaChevronDown, FaListUl, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';

export default function SistemaPrincipal() {
  const { sitios, cargando, error } = useSitios();
  const { filtros, actualizar, limpiar, sitiosFiltrados, hayFiltrosActivos } = useFiltros(sitios);

  const mostrarConteo = !cargando && !error;
  const hayMapa = !cargando && !error && sitiosFiltrados.length > 0;

  // Dropdown de filtros: ahora ocupa espacio en el flujo, no flota encima
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  // Panel de lista sobre el mapa
  const [listaAbierta, setListaAbierta] = useState(false);

  // Estado del asistente (mock)
  const [mensajeUsuario, setMensajeUsuario] = useState('');
  const [conversacion, setConversacion] = useState([
    { tipo: 'asistente', texto: '¡Pura vida! ¿Qué tipo de experiencia te gustaría vivir en Costa Rica?' },
  ]);

  const enviarMensaje = () => {
    if (!mensajeUsuario.trim()) return;
    setConversacion((prev) => [...prev, { tipo: 'usuario', texto: mensajeUsuario }]);
    setMensajeUsuario('');

    setTimeout(() => {
      setConversacion((prev) => [
        ...prev,
        {
          tipo: 'asistente',
          texto: 'Gracias por tu consulta. Te recomiendo revisar los filtros de arriba para afinar tu búsqueda. ¿Querés que te sugiera algo en particular?',
        },
      ]);
    }, 600);
  };

  const sugerencias = [
    'Escapada de 2 días cerca de San José',
    'Playas tranquilas y presupuesto medio',
    'Ruta con naturaleza y poca caminata',
    '¿Qué visitar si viajo con niños?',
  ];

  return (
    <section className={estilos.sistema}>
      {/* ===== BARRA SUPERIOR: filtros compactos + volver ===== */}
      <header className={estilos.barraSuperior}>
        <div className={estilos.filaSuperior}>
          <Link to={RUTAS.inicio} className={estilos.botonVolver}>
            <FaArrowLeft />
            <span>Volver</span>
          </Link>

          <div className={estilos.marca}>
            <span className={estilos.marcaTexto}>Costa Rica</span>
          </div>

          <div className={estilos.pestanasFiltro}>
            <button
              type="button"
              className={`${estilos.pestana} ${filtrosAbiertos ? estilos.pestanaActiva : ''}`}
              onClick={() => setFiltrosAbiertos((v) => !v)}
              aria-expanded={filtrosAbiertos}
            >
              <span>Filtros</span>
              {hayFiltrosActivos && <span className={estilos.puntoActivo} />}
              <FaChevronDown className={filtrosAbiertos ? estilos.iconoRotado : ''} />
            </button>
          </div>

          <div className={estilos.accionesBarra}>
            {mostrarConteo && (
              <span className={estilos.conteoPill}>
                {sitiosFiltrados.length}{' '}
                {sitiosFiltrados.length === 1 ? 'sitio' : 'sitios'}
              </span>
            )}
          </div>
        </div>

        {/* Fila de filtros: parte normal del flujo, empuja el cuerpo hacia abajo */}
        {filtrosAbiertos && (
          <div className={estilos.filaFiltros}>
            <PanelFiltros
              filtros={filtros}
              actualizar={actualizar}
              limpiar={limpiar}
              hayFiltrosActivos={hayFiltrosActivos}
            />
          </div>
        )}
      </header>

      {/* ===== CUERPO: asistente (izq, protagonista) + mapa (der, dominante) ===== */}
      <div className={estilos.cuerpo}>
        {/* ---- Asistente ---- */}
        <div className={estilos.panelAsistente}>
          <div className={estilos.saludo}>
            <div className={estilos.saludoIcono}>
              <RiRobot2Fill />
            </div>
            <h1>¡Pura vida!</h1>
          </div>

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
                onClick={() => setMensajeUsuario(texto)}
              >
                {texto}
              </button>
            ))}
          </div>

          <div className={estilos.inputChat}>
            <input
              type="text"
              placeholder="Pregunta lo que quieras..."
              value={mensajeUsuario}
              onChange={(e) => setMensajeUsuario(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
              className={estilos.input}
            />
            <button onClick={enviarMensaje} className={estilos.botonEnviar} aria-label="Enviar">
              ➤
            </button>
          </div>
        </div>

        {/* ---- Mapa (dominante, se filtra en tiempo real con sitiosFiltrados) ---- */}
        <div className={estilos.panelMapa}>
          {hayMapa ? (
            <MapaSitios sitios={sitiosFiltrados} />
          ) : (
            <div className={estilos.mapaVacio}>Sin resultados para mostrar</div>
          )}

          {mostrarConteo && (
            <button
              type="button"
              className={estilos.botonVerLista}
              onClick={() => setListaAbierta(true)}
            >
              <FaListUl />
              Ver lista ({sitiosFiltrados.length})
            </button>
          )}

          {listaAbierta && (
            <div className={estilos.panelListaFlotante}>
              <div className={estilos.panelListaHeader}>
                <h3>Sitios encontrados</h3>
                <button
                  type="button"
                  className={estilos.botonCerrarLista}
                  onClick={() => setListaAbierta(false)}
                  aria-label="Cerrar lista"
                >
                  <FaTimes />
                </button>
              </div>
              <div className={estilos.panelListaScroll}>
                <ListaSitios
                  sitios={sitiosFiltrados}
                  cargando={cargando}
                  error={error}
                  hayFiltrosActivos={hayFiltrosActivos}
                  onLimpiar={limpiar}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}