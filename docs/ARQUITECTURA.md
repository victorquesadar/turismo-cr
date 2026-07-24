# Arquitectura del sistema

## Visión general

El sistema sigue una arquitectura cliente-servidor de tres capas, según lo definido
en la sección 2.1 del SRS.

```
┌─────────────────────────────────────────────────┐
│  Navegador                                      │
│  apps/web — React + Vite                        │
└───────────────┬─────────────────┬───────────────┘
                │                 │
       consultas de catálogo   consultas al asistente
                │                 │
                ▼                 ▼
┌───────────────────────┐  ┌──────────────────────┐
│  Supabase             │  │  apps/api            │
│  PostgreSQL + PostgREST│  │  Node.js + Express   │
│  Auth + Storage       │◄─┤  Orquestación RAG    │
└───────────────────────┘  └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │  API de Gemini (LLM) │
                           └──────────────────────┘
```

## Decisiones técnicas

### Por qué React + Vite y no Next.js

Ningún requerimiento del SRS exige renderizado en servidor ni optimización para
buscadores. Next.js agregaría complejidad (App Router, componentes de servidor,
frontera cliente/servidor) sin resolver una necesidad documentada. Vite ofrece
arranque inmediato y recarga en caliente, lo que acelera el desarrollo con un
equipo pequeño.

### Por qué un monorepo

Con dos personas trabajando en paralelo sobre frontend y backend, mantener ambos
en el mismo repositorio garantiza que los cambios de contrato entre capas queden
en un mismo commit. Reduce el riesgo de desincronización y simplifica el historial
exigido por el RNF-26.

### Por qué Supabase

Supabase resuelve sin código propio tres requerimientos del SRS:

- **RF-01 a RF-05** — registro, autenticación y recuperación de contraseña
- **RF-55** — almacenamiento de imágenes del catálogo
- **RNF-11** — cifrado de contraseñas con hash y sal

Es PostgreSQL estándar, por lo que la base de datos es portable si en el futuro
se migra a una instancia propia.

### Por qué un servicio de API separado

El RNF-13 prohíbe exponer las llaves del modelo de lenguaje en el cliente. Toda
llamada al LLM debe pasar por un servicio intermedio que las custodie. Ese servicio
también construye el contexto RAG (RF-42) y aplica la limitación de solicitudes
(RNF-16).

El frontend consulta el catálogo directamente contra Supabase; solo las operaciones
del asistente pasan por `apps/api`.

## Flujo RAG del asistente virtual

Implementa los requerimientos RF-40 a RF-44 y RF-50.

```
1. El usuario envía un mensaje en lenguaje natural
2. apps/api extrae los criterios de selección          → RF-40
3. Los criterios se muestran en el panel de preferencias → RF-41
4. apps/api consulta Supabase filtrando por esos criterios → RF-42
5. Los sitios recuperados se inyectan como contexto al LLM
6. El LLM redacta la respuesta usando SOLO ese contexto  → RF-43
7. Si no hubo resultados, se informa sin inventar         → RF-50
8. La respuesta se devuelve con enlaces a las fichas      → RF-44
```

El paso 5 es la garantía contra alucinaciones: el modelo nunca decide qué lugares
existen, solo redacta sobre los que la base de datos devolvió.

## Organización de capas en el frontend

```
features/          Cada módulo del SRS (M01 a M07)
  ├── components/  Componentes propios de esa funcionalidad
  ├── hooks/       Lógica de estado y efectos
  └── services/    Llamadas a Supabase o a la API
components/        Componentes compartidos entre funcionalidades
services/          Clientes de servicios externos
lib/               Utilidades sin dependencias del dominio
```

Regla: un `feature` puede importar de `components`, `services` y `lib`, pero nunca
de otro `feature`. Si dos funcionalidades necesitan lo mismo, sube a `components`.

## Organización de capas en la API

```
routes/       Definición de endpoints HTTP
controllers/  Reciben la petición, validan y delegan
services/     Lógica de negocio (RAG, extracción de criterios)
middleware/   Autenticación, limitación de solicitudes, errores
```

Los controladores no contienen lógica de negocio; los servicios no conocen HTTP.

## Despliegue previsto

| Componente                   | Servicio | Capa     |
| ---------------------------- | -------- | -------- |
| `apps/web`                   | Vercel   | Gratuita |
| `apps/api`                   | Render   | Gratuita |
| Base de datos, auth, storage | Supabase | Gratuita |
