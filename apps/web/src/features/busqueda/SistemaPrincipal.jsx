import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RUTAS } from '@/lib/rutas';
import { useSitios } from '@/features/catalogo/hooks/useSitios';
import { useFiltros } from '@/features/catalogo/hooks/useFiltros';
import { useConversacion } from '@/features/asistente/hooks/useConversacion';
import PanelFiltros from '@/features/catalogo/components/PanelFiltros';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import MapaSitios from '@/features/mapa/components/MapaSitios';
import estilos from './SistemaPrincipal.module.css';
import { FaChevronDown, FaListUl, FaTimes, FaArrowLeft } from 'react-icons/fa';

export default function SistemaPrincipal() {
  const { sitios, cargando, error } = useSitios();
  const { filtros, actualizar, limpiar: limpiarFiltros, sitiosFiltrados, hayFiltrosActivos } = useFiltros(sitios);

  const mostrarConteo = !cargando && !error;
  const hayMapa = !cargando && !error && sitiosFiltrados.length > 0;

  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [listaAbierta, setListaAbierta] = useState(false);

  // Asistente REAL conectado al backend con RAG.
  const { mensajes, cargando: pensando, enviar, limpiar } = useConversacion();
  const [mensajeUsuario, setMensajeUsuario] = useState('');

  const enviarMensaje = () => {
    if (!mensajeUsuario.trim()) return;
    enviar(mensajeUsuario);
    setMensajeUsuario('');
  };

  const manejarLimpiar = () => {
    if (mensajes.length === 0) return;
    if (window.confirm('¿Empezar una nueva conversación? Los mensajes actuales se perderán.')) {
      limpiar();
    }
  };

  const sugerencias = [
    'Escapada de 2 días cerca de San José',
    'Playas tranquilas y presupuesto medio',
    'Ruta con naturaleza y poca caminata',
    '¿Qué visitar si viajo con niños?',
  ];

  return (
    <section className={estilos.sistema}>
      {/* ===== BARRA SUPERIOR ===== */}
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

        {filtrosAbiertos && (
          <div className={estilos.filaFiltros}>
            <PanelFiltros
              filtros={filtros}
              actualizar={actualizar}
              limpiar={limpiarFiltros}
              hayFiltrosActivos={hayFiltrosActivos}
            />
          </div>
        )}
      </header>

      {/* ===== CUERPO: asistente + mapa ===== */}
      <div className={estilos.cuerpo}>
        {/* ---- Asistente ---- */}
        <div className={estilos.panelAsistente}>
          <div className={estilos.saludo}>
            <div className={estilos.saludoIcono}>
              <img src="/imagenes/sloth2.png" alt="" />
            </div>
            <h1>¡Pura vida!</h1>
            {mensajes.length > 0 && (
              <button
                type="button"
                onClick={manejarLimpiar}
                className={estilos.botonNueva}
                title="Empezar una nueva conversación"
              >
                <FaTimes />
                <span>Nueva conversación</span>
              </button>
            )}
          </div>

          <div className={estilos.chat}>
            {mensajes.length === 0 && (
              <div className={estilos.burbujaAsistente}>
                ¡Pura vida! ¿Qué tipo de experiencia te gustaría vivir en Costa Rica?
              </div>
            )}

            {mensajes.map((msg, idx) => (
              <div
                key={idx}
                className={msg.emisor === 'usuario' ? estilos.burbujaUsuario : estilos.burbujaAsistente}
              >
                {msg.texto}

                {msg.sitios && msg.sitios.length > 0 && (
                  <div className={estilos.sitiosRecomendados}>
                    {msg.sitios.map((sitio) => (
                      <Link
                        key={sitio.id}
                        to={RUTAS.sitio.replace(':id', sitio.id)}
                        className={estilos.enlaceSitio}
                      >
                        {sitio.nombre}
                        {sitio.provincia ? ` · ${sitio.provincia}` : ''}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {pensando && (
              <div className={estilos.burbujaAsistente}>El asistente está pensando…</div>
            )}
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
              disabled={pensando}
            />
            <button onClick={enviarMensaje} className={estilos.botonEnviar} aria-label="Enviar" disabled={pensando}>
              ➤
            </button>
          </div>
        </div>

        {/* ---- Mapa ---- */}
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
                  onLimpiar={limpiarFiltros}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}