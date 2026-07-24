# Configuración del entorno

## Variables de entorno

Ninguna credencial se escribe en el código. Todas se leen desde variables de
entorno (RNF-30).

### apps/web/.env

| Variable                 | Descripción                      | Obligatoria |
| ------------------------ | -------------------------------- | ----------- |
| `VITE_SUPABASE_URL`      | URL del proyecto en Supabase     | Sí          |
| `VITE_SUPABASE_ANON_KEY` | Llave pública (anon) de Supabase | Sí          |
| `VITE_API_URL`           | URL del servicio de orquestación | Sí          |
| `VITE_MAPS_API_KEY`      | Llave de Google Maps Platform    | Sí          |

> Las variables con prefijo `VITE_` quedan expuestas en el navegador. Nunca poner
> aquí la llave de servicio de Supabase ni la del modelo de lenguaje.

### apps/api/.env

| Variable               | Descripción                        | Obligatoria           |
| ---------------------- | ---------------------------------- | --------------------- |
| `PORT`                 | Puerto del servicio                | No (3000 por defecto) |
| `SUPABASE_URL`         | URL del proyecto en Supabase       | Sí                    |
| `SUPABASE_SERVICE_KEY` | Llave de servicio de Supabase      | Sí                    |
| `GEMINI_API_KEY`       | Llave de la API de Google Gemini   | Sí                    |
| `CORS_ORIGIN`          | Origen permitido para CORS         | Sí                    |
| `RATE_LIMIT_MAX`       | Consultas al asistente por ventana | No (20 por defecto)   |

## Obtención de credenciales

### Supabase

1. Crear una cuenta en supabase.com y un proyecto nuevo.
2. En _Project Settings → API_ se obtienen la URL, la llave `anon` y la llave `service_role`.
3. La llave `service_role` solo va en `apps/api/.env`, nunca en el frontend.

### Google Gemini

1. Ingresar a Google AI Studio y generar una llave de API.
2. La capa gratuita permite un volumen suficiente para desarrollo y pruebas.
3. Si se agota la cuota, el sistema degrada a búsqueda por filtros (RF-52).

### Google Maps Platform

1. Crear un proyecto en Google Cloud Console.
2. Habilitar _Maps JavaScript API_ y _Places API_.
3. Restringir la llave por dominio antes de desplegar a producción.

## Verificación

Tras completar ambos archivos:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/health
