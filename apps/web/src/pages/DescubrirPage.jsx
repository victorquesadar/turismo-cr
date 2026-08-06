// DescubrirPage.jsx - VERSIÓN FINAL CON HEADER EXISTENTE
import { Link } from 'react-router-dom';
import { RUTAS } from '@/lib/rutas';
import estilos from './DescubrirPage.module.css';
import Encabezado from '@/components/layout/Encabezado';
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiTargetFill, RiRobot2Fill } from "react-icons/ri";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function DescubrirPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <main className={estilos.pagina}>
      {/* ===== HERO CON IMAGEN ===== */}
      <section id="principal" className={estilos.hero} aria-labelledby="titulo-principal">
        <div className={estilos.heroImagen}></div>
        <div className={estilos.heroOverlay}></div>

         <div className={estilos.headerWrapper}>
          <Encabezado />
        </div>

        <div className={estilos.contenidoCompleto}>
          {/* ===== TEXTO DEL HERO ===== */}
          <div className={estilos.heroCapa}>
            <div className={estilos.heroTexto}>
              <h1 id="titulo-principal" className={estilos.titulo}>
                Explorá destinos únicos.
              </h1>
              <p className={estilos.subtitulo}>
                Descubrí Costa Rica a través de experiencias curadas, filtros inteligentes y un asistente que te guía.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLOQUE COMPARTIDO: fondo único e ininterrumpido para ambas secciones ===== */}
      <div className={estilos.bloqueFondoCompartido}>
        {/* ===== SECCIÓN 2: CÓMO FUNCIONA ===== */}
        <section className={estilos.seccionComoFunciona}>
          <div className={estilos.contenedor}>
            <div className={estilos.encabezadoSeccion}>
              <h2>Encontrá tu destino en tres pasos</h2>
            </div>

            <div className={estilos.pasos}>
              <div className={`${estilos.ctaCard} glass`}>
               <div className={estilos.iconoPaso}>
                <FaSearch />
              </div>
                <h3>Explorá</h3>
                <p>Navegá por nuestro catálogo de destinos curados en todo Costa Rica</p>
              </div>
              <div className={`${estilos.ctaCard} glass`}>
                <div className={estilos.iconoPaso}>
                  <RiTargetFill />
                </div>
                <h3>Filtrá</h3>
                <p>Usá filtros por provincia, interés, presupuesto y tipo de actividad</p>
              </div>
              <div className={`${estilos.ctaCard} glass`}>
                <div className={estilos.iconoPaso}>
                  <FaMapLocationDot />
                </div>
                <h3>Ubicá</h3>
                <p>Visualizá todos los sitios en el mapa interactivo y planificá tu ruta</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECCIÓN 3: CTA AL SISTEMA DE BÚSQUEDA + ASISTENTE ===== */}
        <section className={estilos.seccionAccesoSistema} id="ir-al-sistema">
          <div className={estilos.contenedor}>
            <div className={`${estilos.accesoCard} glass`}>
              <div className={estilos.accesoTexto}>
                <span className={estilos.etiquetaAcceso}>Búsqueda + Asistente IA</span>
                <h2>
                  Buscá con filtros y charlá con nuestro <span className={estilos.destacado}>asistente virtual</span>
                </h2>
                <p>
                  Accedé al buscador interactivo con mapa en tiempo real y un asistente
                  que te recomienda destinos según lo que buscás.
                </p>
              </div>
              <div className={estilos.accesoAcciones}>
                <Link to={RUTAS.mapa} className={estilos.botonPrimario}>
                  <RiRobot2Fill />
                  Descubrir
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== SECCIÓN 4: CTA FINAL ===== */}
     <section className={estilos.seccionCta}>
        <div className={estilos.contenedor}>
          <div className={`${estilos.ctaCard} glass`}>
            <h2>
              ¿Listo para <span className={estilos.destacado}>explorar</span> Costa Rica?
            </h2>
            <p>Empezá ahora a descubrir los mejores destinos con recomendaciones curadas</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={estilos.footer} id="sobre-nosotros">
        <div className={estilos.footerContenedor}>
          <div className={estilos.footerColumna}>
            <div className={estilos.footerLogo}>
              <span className={estilos.logoD}>D</span>escubre
              <span className={estilos.logoC}>C</span>
              <span className={estilos.logoR}>R</span>
            </div>
            <p className={estilos.footerDescripcion}>
              Centralizamos el turismo en Costa Rica. Explora sitios con filtros inteligentes,
              mapa interactivo, favoritos y asistente virtual RAG.
            </p>
          </div>

          <div className={estilos.footerColumna}>
            <h4>Explorar</h4>
            <Link to="/#inicio">Inicio</Link>
            <Link to={RUTAS.mapa}>Búsqueda manual</Link>
            <Link to={RUTAS.asistente}>Asistente IA</Link>
            <Link to="/#sobre-nosotros">Sobre nosotros</Link>
          </div>

          <div className={estilos.footerColumna}>
            <h4>Legal</h4>
            <Link to="/#privacidad">Política de privacidad</Link>
            <Link to="/#terminos">Términos de uso</Link>
            <Link to="/#contacto">Contacto</Link>
          </div>

          <div className={estilos.footerColumna}>
            <h4>Conecta</h4>
            <div className={estilos.footerSocial}>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="LinkedIn">🔗</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
            <p className={estilos.footerContacto}>info@descubrecr.com</p>
            <p className={estilos.footerContacto}>+506 6256-7524</p>
          </div>
        </div>

        <div className={estilos.footerBarra}>
          <p>© {new Date().getFullYear()} DescubreCR. Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  );
}