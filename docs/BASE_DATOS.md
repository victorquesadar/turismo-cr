# Base de datos

## Entidades

Derivadas del capítulo 6 del SRS.

| Tabla                     | Descripción                          | Requerimientos               |
| ------------------------- | ------------------------------------ | ---------------------------- |
| `usuarios`                | Personas registradas en el sistema   | RF-01 a RF-07                |
| `provincias`              | Catálogo de provincias de Costa Rica | RF-15, RF-27                 |
| `categorias`              | Tipos de actividad turística         | RF-16, RF-57                 |
| `etiquetas`               | Etiquetas descriptivas de los sitios | RF-08, RF-57                 |
| `sitios_turisticos`       | Catálogo principal de sitios         | RF-08 a RF-14, RF-53 a RF-61 |
| `sitio_etiquetas`         | Relación entre sitios y etiquetas    | RF-08, RF-33                 |
| `imagenes`                | Galería de cada sitio                | RF-10, RF-55                 |
| `favoritos`               | Lugares guardados por usuario        | RF-30 a RF-37                |
| `conversaciones`          | Sesiones con el asistente virtual    | RF-48, RF-49                 |
| `mensajes`                | Mensajes de cada conversación        | RF-38, RF-45, RF-48          |
| `preferencias_detectadas` | Criterios extraídos por el asistente | RF-40, RF-41                 |

## Convenciones

- Nombres de tablas en plural y `snake_case`.
- Clave primaria `id` de tipo `uuid` con valor por defecto generado.
- Campos de auditoría `creado_en` y `actualizado_en` en todas las tablas.
- Claves foráneas con `on delete` explícito.
- Sin borrado físico en `sitios_turisticos`: se usa el campo `estado` (RF-56).

## Migraciones

Cada cambio de esquema es un archivo nuevo en `supabase/migrations/`, nunca se
edita una migración ya aplicada.

```
supabase/migrations/
├── 20260101000001_crear_tablas_base.sql
├── 20260101000002_crear_tabla_sitios.sql
└── 20260101000003_configurar_rls.sql
```

Formato del nombre: `AAAAMMDDHHMMSS_descripcion_breve.sql`.

## Seguridad a nivel de fila

Supabase permite políticas de acceso por fila. Se aplican para cumplir RNF-14 y RNF-21:

| Tabla               | Política                                                     |
| ------------------- | ------------------------------------------------------------ |
| `sitios_turisticos` | Lectura pública solo de registros con `estado = 'publicado'` |
| `favoritos`         | Cada persona accede únicamente a sus propios registros       |
| `conversaciones`    | Cada persona accede únicamente a sus propias conversaciones  |
| `mensajes`          | Accesibles solo a través de una conversación propia          |

Las operaciones de escritura sobre el catálogo quedan restringidas al rol
administrador, verificadas en el servidor.

## Datos iniciales

`supabase/seed/` contiene los datos que deben existir antes de usar el sistema:
las siete provincias, las categorías de actividad y un conjunto de etiquetas base.
