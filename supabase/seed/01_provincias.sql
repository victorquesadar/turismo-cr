-- Provincias de Costa Rica.
insert into provincias (codigo, nombre, region_turistica) values
  ('san-jose',   'San José',   'Valle Central'),
  ('alajuela',   'Alajuela',   'Llanuras del Norte'),
  ('cartago',    'Cartago',    'Valle Central'),
  ('heredia',    'Heredia',    'Valle Central'),
  ('guanacaste', 'Guanacaste', 'Guanacaste Norte'),
  ('puntarenas', 'Puntarenas', 'Pacífico Central'),
  ('limon',      'Limón',      'Caribe')
on conflict (codigo) do nothing;
