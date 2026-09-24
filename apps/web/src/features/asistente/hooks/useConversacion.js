import { useState, useCallback, useEffect } from 'react';
import { consultarAsistente } from '../services/asistenteService';
import { useAuth } from '@/features/autenticacion/AuthContext';

/**
 * Maneja el estado de la conversacion con el asistente (RF-38, RF-45).
 * Persiste los mensajes en localStorage SOLO para personas autenticadas,
 * para que la conversacion sobreviva a la navegacion y a la recarga (RF-48 basico).
 * Las personas no autenticadas pueden usar el asistente pero su conversacion
 * es temporal (no persiste al recargar ni al cambiar de pagina).
 */
const CLAVE_MENSAJES = 'asistente:mensajes';
const CLAVE_CRITERIOS = 'asistente:criterios';

function cargar(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

export function useConversacion() {
  const { estaAutenticado } = useAuth();

  // Si esta autenticada, carga del localStorage. Si no, arranca vacio siempre.
  const [mensajes, setMensajes] = useState(() =>
    estaAutenticado ? cargar(CLAVE_MENSAJES, []) : []
  );
  const [criterios, setCriterios] = useState(() =>
    estaAutenticado ? cargar(CLAVE_CRITERIOS, null) : null
  );
  const [cargando, setCargando] = useState(false);

  // Cuando cambia el estado de autenticacion:
  // - si se acaba de autenticar, carga lo guardado (si hay algo)
  // - si se acaba de cerrar sesion, limpia la conversacion en pantalla y del localStorage
  useEffect(() => {
    if (estaAutenticado) {
      setMensajes(cargar(CLAVE_MENSAJES, []));
      setCriterios(cargar(CLAVE_CRITERIOS, null));
    } else {
      setMensajes([]);
      setCriterios(null);
      try {
        localStorage.removeItem(CLAVE_MENSAJES);
        localStorage.removeItem(CLAVE_CRITERIOS);
      } catch { /* nada */ }
    }
  }, [estaAutenticado]);

  // Guardar en localStorage solo si esta autenticada.
  useEffect(() => {
    if (!estaAutenticado) return;
    try {
      localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(mensajes));
    } catch { /* nada */ }
  }, [mensajes, estaAutenticado]);

  useEffect(() => {
    if (!estaAutenticado) return;
    try {
      localStorage.setItem(CLAVE_CRITERIOS, JSON.stringify(criterios));
    } catch { /* nada */ }
  }, [criterios, estaAutenticado]);

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