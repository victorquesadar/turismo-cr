-- Catalogo principal de sitios turisticos.
-- Requerimientos: RF-08 a RF-14, RF-53 a RF-61

create type estado_sitio as enum ('borrador', 'publicado', 'archivado');
create type origen_dato as enum ('manual', 'google_places', 'fuente_local');
create type rango_presupuesto as enum ('bajo', 'medio', 'alto');
create type duracion_visita as enum ('medio-dia', 'un-dia', 'fin-de-semana', 'tres-cinco-dias');

create table sitios_turisticos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text not null,
  latitud numeric(9, 6) not null,
  longitud numeric(9, 6) not null,
  direccion text,
  provincia_id uuid not null references provincias (id) on delete restrict,
  canton text,
  categoria_id uuid not null references categorias (id) on delete restrict,
  presupuesto rango_presupuesto not null,
  duracion duracion_visita not null,
  temporada_recomendada text,
  es_accesible boolean not null default false,      -- RF-12
  es_poco_conocido boolean not null default false,  -- RF-13
  origen origen_dato not null default 'manual',     -- RF-61
  estado estado_sitio not null default 'borrador',  -- RF-56
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create table sitio_etiquetas (
  sitio_id uuid not null references sitios_turisticos (id) on delete cascade,
  etiqueta_id uuid not null references etiquetas (id) on delete cascade,
  primary key (sitio_id, etiqueta_id)
);

create table imagenes (
  id uuid primary key default gen_random_uuid(),
  sitio_id uuid not null references sitios_turisticos (id) on delete cascade,
  url text not null,
  texto_alternativo text,
  orden smallint not null default 0,
  creado_en timestamptz not null default now()
);

-- Indices para los filtros del catalogo (RF-15 a RF-20).
create index idx_sitios_provincia on sitios_turisticos (provincia_id);
create index idx_sitios_categoria on sitios_turisticos (categoria_id);
create index idx_sitios_estado on sitios_turisticos (estado);
create index idx_sitios_accesible on sitios_turisticos (es_accesible);
create index idx_imagenes_sitio on imagenes (sitio_id);

-- RNF-14: solo los sitios publicados son visibles publicamente.
alter table sitios_turisticos enable row level security;
alter table sitio_etiquetas enable row level security;
alter table imagenes enable row level security;

create policy "sitios publicados visibles" on sitios_turisticos
  for select using (estado = 'publicado');

create policy "etiquetas de sitios visibles" on sitio_etiquetas
  for select using (true);

create policy "imagenes de sitios publicados visibles" on imagenes
  for select using (
    exists (
      select 1 from sitios_turisticos s
      where s.id = imagenes.sitio_id and s.estado = 'publicado'
    )
  );
