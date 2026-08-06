import { useState, useCallback } from 'react';
import { consultarAsistente } from '../services/asistenteService';

/**
 * Maneja el estado de la conversacion con el asistente (RF-38, RF-45).
 * Guarda los mensajes en memoria durante la sesion y las preferencias
 * detectadas en la ultima consulta (RF-41).
 */
export function useConversacion() {
  const [mensajes, setMensajes] = useState([]);
  const [criterios, setCriterios] = useState(null);
  const [cargando, setCargando] = useState(false);

  const enviar = useCallback(async (texto) => {
    const textoLimpio = texto.trim();
    if (!textoLimpio || cargando) return;

    // Agrega el mensaje del usuario de inmediato.
    setMensajes((prev) => [...prev, { emisor: 'usuario', texto: textoLimpio }]);
    setCargando(true);

    try {
      const resultado = await consultarAsistente(textoLimpio);
      setCriterios(resultado.criterios);
      setMensajes((prev) => [
        ...prev,
        { emisor: 'asistente', texto: resultado.respuesta, sitios: resultado.sitios },
      ]);
    } catch (e) {
      setMensajes((prev) => [
        ...prev,
        {
          emisor: 'asistente',
          texto:
            e.message ??
            'No pude procesar tu consulta en este momento. Probá de nuevo en un momento.',
          sitios: [],
        },
      ]);
    } finally {
      setCargando(false);
    }
  }, [cargando]);

  return { mensajes, criterios, cargando, enviar };
}
