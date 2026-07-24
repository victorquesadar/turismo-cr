# Convenciones de código

## Nomenclatura de archivos

| Tipo              | Convención                  | Ejemplo                   |
| ----------------- | --------------------------- | ------------------------- |
| Componente React  | PascalCase                  | `TarjetaSitio.jsx`        |
| Hook              | camelCase con prefijo `use` | `useFiltrosCatalogo.js`   |
| Servicio          | camelCase                   | `sitiosService.js`        |
| Utilidad          | camelCase                   | `formatearPrecio.js`      |
| Constantes        | camelCase                   | `provincias.js`           |
| Estilos de módulo | igual al componente         | `TarjetaSitio.module.css` |

## Nomenclatura en código

- **Componentes y clases:** `PascalCase`
- **Funciones y variables:** `camelCase`
- **Constantes globales:** `MAYUSCULAS_CON_GUION_BAJO`
- **Tablas y columnas en base de datos:** `snake_case`

El código se escribe en español para el dominio (`sitio`, `favorito`, `provincia`)
y en inglés para términos técnicos establecidos (`useState`, `fetch`, `router`).

## Estructura de un componente

```jsx
// 1. Importaciones externas
import { useState } from 'react';

// 2. Importaciones internas
import { useFiltrosCatalogo } from '../hooks/useFiltrosCatalogo';
import Boton from '@/components/ui/Boton';

// 3. Constantes del módulo
const MAXIMO_ETIQUETAS = 4;

// 4. Componente
export default function TarjetaSitio({ sitio, onSeleccionar }) {
  const [expandida, setExpandida] = useState(false);

  return (
    // ...
  );
}
```

## Reglas generales

- Un componente por archivo, exportado por defecto.
- Componentes por debajo de 200 líneas; si crece, extraer subcomponentes.
- Nada de lógica de negocio dentro de los componentes: va en hooks o servicios.
- Nada de llamadas HTTP directas desde componentes: siempre a través de un servicio.
- Toda variable de entorno se lee desde `config/`, nunca con `import.meta.env` disperso.

## Comentarios

Se comenta el _porqué_, no el _qué_. Si el código necesita explicar qué hace,
conviene renombrar en lugar de comentar.

Cuando un bloque implementa un requerimiento del SRS, se indica su código:

```js
// RF-43: el asistente solo puede recomendar sitios presentes en el catálogo.
const contexto = sitiosRecuperados.map(formatearParaContexto);
```

## Manejo de errores

- Los errores de red se capturan en la capa de servicios.
- Los mensajes al usuario nunca exponen detalles técnicos (RNF-23).
- Los errores del servidor se registran con fecha, origen y detalle (RNF-25).
