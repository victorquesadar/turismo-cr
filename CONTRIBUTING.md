# Guía de contribución

## Flujo de trabajo

Este proyecto usa un flujo basado en ramas de funcionalidad.

1. Actualizar `main` local: `git checkout main && git pull`
2. Crear la rama de trabajo: `git checkout -b feat/RF-15-filtro-provincia`
3. Trabajar en commits pequeños y descriptivos
4. Subir la rama: `git push -u origin feat/RF-15-filtro-provincia`
5. Abrir un Pull Request hacia `main`
6. La otra persona revisa y aprueba
7. Fusionar con *squash merge* y borrar la rama

Nunca se hace commit directo sobre `main`.

## Nomenclatura de ramas

| Prefijo | Uso | Ejemplo |
|---|---|---|
| `feat/` | Nueva funcionalidad | `feat/RF-30-marcar-favorito` |
| `fix/` | Corrección de error | `fix/RF-24-marcadores-duplicados` |
| `docs/` | Solo documentación | `docs/actualizar-arquitectura` |
| `refactor/` | Reestructuración sin cambio funcional | `refactor/extraer-cliente-supabase` |
| `test/` | Pruebas | `test/RF-42-recuperacion-rag` |
| `chore/` | Configuración, dependencias | `chore/configurar-eslint` |

Cuando la rama implementa un requerimiento del SRS, se incluye su código (`RF-XX` o `RNF-XX`).

## Mensajes de commit

Se sigue el formato de Conventional Commits:

```
<tipo>(<alcance>): <descripción en presente>

[cuerpo opcional]
```

Ejemplos:

```
feat(catalogo): implementar filtro por provincia (RF-15)
fix(mapa): corregir sincronizacion de marcadores con filtros (RF-25)
docs(srs): actualizar criterios de aceptacion del asistente
```

Tipos válidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## Antes de abrir un Pull Request

- [ ] `npm run lint` pasa sin errores
- [ ] `npm run format:check` pasa sin errores
- [ ] La funcionalidad fue probada manualmente
- [ ] Se indica en la descripción qué requerimiento del SRS resuelve
- [ ] No se subieron archivos `.env` ni credenciales

## División de responsabilidades

Según lo acordado en la propuesta de TFG:

| Área | Responsable principal |
|---|---|
| Frontend, interfaz, mapa | Manuel Mora Sandí |
| Base de datos, API, asistente virtual | Víctor Quesada Rodríguez |

Ambas personas revisan el trabajo de la otra antes de fusionar.
