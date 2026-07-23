-- Etiquetas descriptivas base del catalogo.
insert into etiquetas (nombre) values
  ('Playa'), ('Montaña'), ('Catarata'), ('Volcán'), ('Bosque nuboso'),
  ('Senderismo'), ('Surf'), ('Avistamiento'), ('Termales'), ('Familia'),
  ('Aventura'), ('Relajación'), ('Fauna'), ('Historia'), ('Comunitario')
on conflict (nombre) do nothing;
