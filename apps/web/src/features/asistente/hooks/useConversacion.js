import { useState, useCallback, useEffect } from 'react';
import { consultarAsistente } from '../services/asistenteService';

/**
 * Maneja el estado de la conversacion con el asistente (RF-38, RF-45).
 * Persiste los mensajes en localStorage para que la conversacion sobreviva
 * a la navegacion entre paginas y a la recarga del navegador (RF-48 basico).
 */
const CLAVE_MENSAJES = 'asistente:mensajes';
const CLAVE_CRITERIOS = 'asistente:criterios';

// Recupera del localStorage al iniciar. Si no hay nada o falla, arranca vacio.
function cargar(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

export function useConversacion() {
  const [mensajes, setMensajes] = useState(() => cargar(CLAVE_MENSAJES, []));
  const [criterios, setCriterios] = useState(() => cargar(CLAVE_CRITERIOS, null));
  const [cargando, setCargando] = useState(false);

  // Cada vez que cambian los mensajes, se guardan en localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(mensajes));
    } catch {
      /* si el navegador no soporta o esta lleno, se ignora */
    }
  }, [mensajes]);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CRITERIOS, JSON.stringify(criterios));
    } catch {
      /* idem */
    }
  }, [criterios]);

  const enviar = useCallback(async (texto) => {
    const textoLimpio = texto.trim();
    if (!textoLimpio || cargando) return;

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
          texto: e.message ?? 'No pude procesar tu consulta en este momento. Probá de nuevo en un momento.',
          sitios: [],
        },
      ]);
    } finally {
      setCargando(false);
    }
  }, [cargando]);

  // Permite limpiar la conversacion (util para un boton "nueva conversacion").
  const limpiar = useCallback(() => {
    setMensajes([]);
    setCriterios(null);
    try {
      localStorage.removeItem(CLAVE_MENSAJES);
      localStorage.removeItem(CLAVE_CRITERIOS);
    } catch { /* nada */ }
  }, []);

  return { mensajes, criterios, cargando, enviar, limpiar };
}