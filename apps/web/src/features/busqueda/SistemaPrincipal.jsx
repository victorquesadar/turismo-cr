import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RUTAS } from '@/lib/rutas';
import { useSitios } from '@/features/catalogo/hooks/useSitios';
import { useFiltros } from '@/features/catalogo/hooks/useFiltros';
import { useConversacion } from '@/features/asistente/hooks/useConversacion';
import PanelFiltros from '@/features/catalogo/components/PanelFiltros';
import ListaSitios from '@/features/catalogo/components/ListaSitios';
import MapaSitios from '@/features/mapa/components/MapaSitios';
import estilos from './SistemaPrincipal.module.css';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';

export default function SistemaPrincipal() {
  const { sitios, cargando, error } = useSitios();
  const { filtros, actualizar, limpiar, sitiosFiltrados, hayFiltrosActivos } = useFiltros(sitios);

  const mostrarConteo = !cargando && !error;
  const hayMapa = !cargando && !error && sitiosFiltrados.length > 0;

  const [modoVista, setModoVista] = useState('asistente');
  const [listaAbierta, setListaAbierta] = useState(false);

  // Asistente REAL conectado al backend con RAG y Gemini.
  const { mensajes, cargando: pensando, enviar } = useConversacion();
  const [mensajeUsuario, setMensajeUsuario] = useState('');
  const [conversacionIniciada, setConversacionIniciada] = useState(false);
  const entradaRef = useRef(null);

  const ajustarAlturaEntrada = (evento) => {
    const entrada = evento.currentTarget;
    entrada.style.height = 'auto';
    entrada.style.height = `${Math.min(entrada.scrollHeight, 132)}px`;
  };

  const enviarMensaje = () => {
    if (!mensajeUsuario.trim()) return;
    setConversacionIniciada(true);
    enviar(mensajeUsuario);
    setMensajeUsuario('');
    if (entradaRef.current) entradaRef.current.style.height = 'auto';
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

          <div className={estilos.selectorModo} role="group" aria-label="Modo de búsqueda">
            <button
              type="button"
              className={`${estilos.pestana} ${modoVista === 'asistente' ? estilos.pestanaActiva : ''}`}
              onClick={() => setModoVista('asistente')}
              aria-pressed={modoVista === 'asistente'}
            >
              Asistente
            </button>
            <button
              type="button"
              className={`${estilos.pestana} ${modoVista === 'manual' ? estilos.pestanaActiva : ''}`}
              onClick={() => setModoVista('manual')}
              aria-pressed={modoVista === 'manual'}
            >
              Búsqueda manual
              {hayFiltrosActivos && <span className={estilos.puntoActivo} />}
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

      </header>

      {/* ===== CUERPO: asistente (izq) + mapa (der) ===== */}
      <div className={estilos.cuerpo}>
        {/* ---- Asistente o búsqueda manual ---- */}
        {modoVista === 'asistente' ? (
        <div className={estilos.panelAsistente}>
          <div className={estilos.saludo}>
            <div className={estilos.saludoIcono}>
              <img src="/imagenes/sloth2.png" alt="" />
            </div>
            <h1>¡Pura vida!</h1>
          </div>

          <div className={estilos.chat}>
            {mensajes.length === 0 && (
              <div className={estilos.burbujaAsistente}>
                ¿Qué tipo de experiencia te gustaría vivir en Costa Rica?
              </div>
            )}

            {mensajes.map((msg, idx) => (
              <div
                key={idx}
                className={msg.emisor === 'usuario' ? estilos.burbujaUsuario : estilos.burbujaAsistente}
              >
                {msg.texto}

                {/* Enlaces a las fichas de los sitios recomendados */}
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

          {!conversacionIniciada && (
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
          )}

          <div className={estilos.inputChat}>
            <textarea
              ref={entradaRef}
              rows="1"
              placeholder="Pregunta lo que quieras..."
              value={mensajeUsuario}
              onChange={(e) => setMensajeUsuario(e.target.value)}
              onInput={ajustarAlturaEntrada}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  enviarMensaje();
                }
              }}
              className={estilos.input}
              disabled={pensando}
            />
            <button onClick={enviarMensaje} className={estilos.botonEnviar} aria-label="Enviar" disabled={pensando}>
              ➤
            </button>
          </div>
        </div>
        ) : (
          <div className={estilos.panelFiltrosManual}>
            <PanelFiltros
              filtros={filtros}
              actualizar={actualizar}
              limpiar={limpiar}
              hayFiltrosActivos={hayFiltrosActivos}
            />
          </div>
        )}

        {/* ---- Mapa ---- */}
        <div className={estilos.panelMapa}>
          {hayMapa ? (
            <MapaSitios sitios={sitiosFiltrados} />
          ) : (
            <div className={estilos.mapaVacio} role="status">
              <div className={estilos.estadoVacio}>
                <span className={estilos.estadoIcono}>
                  <img src="/imagenes/not-found.png" alt="" />
                </span>
                <h2>{hayFiltrosActivos ? 'No encontramos coincidencias' : 'No hay sitios disponibles'}</h2>
                <p>
                  {hayFiltrosActivos
                    ? 'Probá ampliar o cambiar los filtros para descubrir más destinos.'
                    : 'En este momento no hay destinos para mostrar en el mapa.'}
                </p>
                {hayFiltrosActivos && (
                  <button type="button" className={estilos.botonLimpiarEstado} onClick={limpiar}>
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
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