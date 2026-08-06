import { Link } from 'react-router-dom';
import { rutaSitio } from '@/lib/rutas';
import estilos from './Mensaje.module.css';

/** Una burbuja de la conversacion (RF-38, RF-44). */
export default function Mensaje({ mensaje }) {
  const esUsuario = mensaje.emisor === 'usuario';

  return (
    <div className={`${estilos.fila} ${esUsuario ? estilos.filaUsuario : ''}`}>
      <div className={`${estilos.burbuja} ${esUsuario ? estilos.usuario : estilos.asistente}`}>
        <p className={estilos.texto}>{mensaje.texto}</p>

        {/* RF-44: enlaces a las fichas de los sitios recomendados */}
        {mensaje.sitios && mensaje.sitios.length > 0 && (
          <ul className={estilos.sitios}>
            {mensaje.sitios.map((sitio) => (
              <li key={sitio.id}>
                <Link to={rutaSitio(sitio.id)} className={estilos.enlace}>
                  {sitio.nombre}
                  {sitio.provincia ? ` · ${sitio.provincia}` : ''}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
