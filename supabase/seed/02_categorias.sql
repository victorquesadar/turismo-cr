-- Tipos de actividad turistica. RF-16.
insert into categorias (codigo, nombre, icono, descripcion) values
  ('deporte',     'Deporte',     'activity',  'Actividades deportivas y de aventura'),
  ('aire-libre',  'Aire libre',  'tree',      'Naturaleza, senderismo y observación'),
  ('cultura',     'Cultura',     'landmark',  'Patrimonio, historia y tradición'),
  ('gastronomia', 'Gastronomía', 'utensils',  'Experiencias culinarias locales'),
  ('bienestar',   'Bienestar',   'heart',     'Descanso, termales y relajación')
on conflict (codigo) do nothing;
