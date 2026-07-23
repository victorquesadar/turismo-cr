-- Catalogos base del sistema: provincias, categorias y etiquetas.
-- Requerimientos: RF-15, RF-16, RF-57

create extension if not exists "pgcrypto";

create table provincias (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nombre text not null,
  region_turistica text,
  creado_en timestamptz not null default now()
);

create table categorias (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nombre text not null,
  icono text,
  descripcion text,
  creado_en timestamptz not null default now()
);

create table etiquetas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  creado_en timestamptz not null default now()
);

-- Lectura publica de los catalogos base.
alter table provincias enable row level security;
alter table categorias enable row level security;
alter table etiquetas enable row level security;

create policy "provincias visibles para todos" on provincias for select using (true);
create policy "categorias visibles para todos" on categorias for select using (true);
create policy "etiquetas visibles para todos" on etiquetas for select using (true);
