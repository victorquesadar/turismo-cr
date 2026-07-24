# Sistema web de recomendación y descubrimiento de sitios turísticos en Costa Rica

Trabajo Final de Graduación — Escuela de Informática, Universidad Nacional.

Plataforma web que centraliza información turística curada de Costa Rica y permite
explorar sitios de interés mediante filtros, un mapa interactivo, gestión de favoritos
y un asistente virtual conversacional basado en RAG.

- **Estudiantes:** Manuel Mora Sandí, Víctor Quesada Rodríguez
- **Patrocinador:** Complejo Turístico Rancho Huetar
- **Especificación:** ver `docs/SRS.md` para el detalle de requerimientos (RF-01 a RF-62, RNF-01 a RNF-30)

## Estructura del repositorio

```
turismo-cr/
├── apps/
│   ├── web/          Frontend React + Vite
│   └── api/          Servicio de orquestación Node.js (LLM + RAG)
├── packages/
│   └── shared/       Tipos y constantes compartidas entre web y api
├── supabase/
│   ├── migrations/   Migraciones SQL versionadas
│   └── seed/         Datos iniciales del catálogo
└── docs/             Documentación técnica y del TFG
```

## Requisitos previos

- Node.js 20 o superior
- npm 10 o superior
- Cuenta en Supabase (capa gratuita)
- Llave de API de Google Gemini (capa gratuita)
- Llave de API de Google Maps Platform

## Puesta en marcha

```bash
git clone <url-del-repositorio>
cd turismo-cr
npm install

cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
# completar ambos archivos con las credenciales correspondientes

npm run dev
```

El frontend queda en `http://localhost:5173` y la API en `http://localhost:3000`.

## Comandos disponibles

| Comando           | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Levanta frontend y API simultáneamente       |
| `npm run dev:web` | Levanta solo el frontend                     |
| `npm run dev:api` | Levanta solo la API                          |
| `npm run build`   | Construye ambas aplicaciones para producción |
| `npm run lint`    | Ejecuta ESLint sobre todo el repositorio     |
| `npm run format`  | Formatea el código con Prettier              |
| `npm run test`    | Ejecuta las pruebas automatizadas            |

## Documentación

- [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md) — decisiones técnicas y estructura de capas
- [`docs/CONVENCIONES.md`](docs/CONVENCIONES.md) — estilo de código, ramas y commits
- [`docs/CONFIGURACION.md`](docs/CONFIGURACION.md) — variables de entorno y servicios externos
- [`docs/BASE_DATOS.md`](docs/BASE_DATOS.md) — modelo de datos y migraciones

## Licencia

Uso académico. Universidad Nacional de Costa Rica.
