-- Favoritos por persona usuaria e historial del asistente virtual.
-- Requerimientos: RF-30 a RF-37, RF-48, RF-49, RNF-21

create table favoritos (
  usuario_id uuid not null references auth.users (id) on delete cascade,
  sitio_id uuid not null references sitios_turisticos (id) on delete cascade,
  creado_en timestamptz not null default now(),
  primary key (usuario_id, sitio_id)
);

create table conversaciones (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references auth.users (id) on delete cascade,
  titulo text,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create type emisor_mensaje as enum ('usuario', 'asistente');

create table mensajes (
  id uuid primary key default gen_random_uuid(),
  conversacion_id uuid not null references conversaciones (id) on delete cascade,
  emisor emisor_mensaje not null,
  contenido text not null,
  creado_en timestamptz not null default now()
);

create table preferencias_detectadas (
  id uuid primary key default gen_random_uuid(),
  conversacion_id uuid not null references conversaciones (id) on delete cascade,
  tipo_criterio text not null,
  valor text not null,
  ajustado_manualmente boolean not null default false,
  creado_en timestamptz not null default now()
);

create index idx_favoritos_usuario on favoritos (usuario_id);
create index idx_conversaciones_usuario on conversaciones (usuario_id);
create index idx_mensajes_conversacion on mensajes (conversacion_id);

-- RNF-21: cada persona accede unicamente a sus propios datos.
alter table favoritos enable row level security;
alter table conversaciones enable row level security;
alter table mensajes enable row level security;
alter table preferencias_detectadas enable row level security;

create policy "favoritos propios" on favoritos
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

create policy "conversaciones propias" on conversaciones
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

create policy "mensajes de conversaciones propias" on mensajes
  for all using (
    exists (
      select 1 from conversaciones c
      where c.id = mensajes.conversacion_id and c.usuario_id = auth.uid()
    )
  );

create policy "preferencias de conversaciones propias" on preferencias_detectadas
  for all using (
    exists (
      select 1 from conversaciones c
      where c.id = preferencias_detectadas.conversacion_id and c.usuario_id = auth.uid()
    )
  );
