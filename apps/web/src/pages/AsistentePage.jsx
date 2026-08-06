import { useState, useRef, useEffect } from 'react';
import { useConversacion } from '@/features/asistente/hooks/useConversacion';
import Mensaje from '@/features/asistente/components/Mensaje';
import PreferenciasDetectadas from '@/features/asistente/components/PreferenciasDetectadas';
import estilos from './AsistentePage.module.css';

const SUGERENCIAS = [
  'Busco playas tranquilas y baratas en Guanacaste',
  'Quiero ver volcanes y aguas termales',
  'Lugares accesibles para silla de ruedas',
  'Algo de cultura en San José para un día',
];

/** Modulo de Recomendacion Inteligente: asistente virtual (RF-38 a RF-52). */
export default function AsistentePage() {
  const { mensajes, criterios, cargando, enviar } = useConversacion();
  const [entrada, setEntrada] = useState('');
  const finRef = useRef(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, cargando]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    enviar(entrada);
    setEntrada('');
  };

  const usarSugerencia = (texto) => {
    enviar(texto);
  };

  return (
    <main className={estilos.pagina}>
      <div className={estilos.columnaChat}>
        <header className={estilos.encabezado}>
          <h1 className={estilos.titulo}>Asistente de viaje</h1>
          <p className={estilos.subtitulo}>
            Contame qué tipo de experiencia buscás y te recomiendo lugares de Costa Rica.
          </p>
        </header>

        <div className={estilos.conversacion}>
          {mensajes.length === 0 && (
            <div className={estilos.bienvenida}>
              <p>¡Hola! Soy tu asistente para descubrir Costa Rica. ¿Qué te gustaría hacer?</p>
              <div className={estilos.sugerencias}>
                {SUGERENCIAS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={estilos.sugerencia}
                    onClick={() => usarSugerencia(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mensajes.map((mensaje, i) => (
            <Mensaje key={i} mensaje={mensaje} />
          ))}

          {cargando && (
            <div className={estilos.escribiendo}>El asistente está pensando…</div>
          )}

          <div ref={finRef} />
        </div>

        <form className={estilos.entrada} onSubmit={manejarEnvio}>
          <input
            type="text"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Escribí tu consulta…"
            disabled={cargando}
            aria-label="Mensaje para el asistente"
          />
          <button type="submit" disabled={cargando || !entrada.trim()}>
            Enviar
          </button>
        </form>
      </div>

      <aside className={estilos.columnaLateral}>
        <PreferenciasDetectadas criterios={criterios} />
      </aside>
    </main>
  );
}
