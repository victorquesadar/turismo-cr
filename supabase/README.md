# Supabase

## Migraciones

Las migraciones se aplican en orden alfabético. Nunca se edita una migración
ya aplicada; todo cambio de esquema es un archivo nuevo.

Para aplicarlas desde el panel de Supabase: *SQL Editor* → pegar el contenido
de cada archivo en orden y ejecutar.

Con la CLI de Supabase:

```bash
supabase db push
```

## Datos iniciales

Tras aplicar las migraciones, ejecutar los archivos de `seed/` en orden numérico.
Contienen las provincias, las categorías de actividad y las etiquetas base
necesarias antes de cargar sitios turísticos.

## Storage

Crear un bucket público llamado `sitios` para las imágenes del catálogo (RF-55).
