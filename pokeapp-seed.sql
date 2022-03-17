INSERT INTO users (username, password, favorite_id)
VALUES ('cooperdoon', 'letmein', 257),
       ('bigboynick', 'yum', 68),
       ('chadmaster', 'passwordle', 475);

INSERT INTO teams (name, username)
VALUES ('cooperteam', 'cooperdoon'),
        ('nickteam', 'bigboynick'),
        ('chadders', 'chadmaster');

INSERT INTO moves (name, type, url)
VALUES  ('swords-dance', 'Normal', 'https://pokeapi.co/api/v2/move/14/'),
        ('mega-punch', 'Normal', 'https://pokeapi.co/api/v2/move/5/'),
        ('thunder-punch', 'Electric', 'https://pokeapi.co/api/v2/move/9/'),
        ('counter', 'Fighting', 'https://pokeapi.co/api/v2/move/68/'),
        ('seismic-toss', 'Fighting', 'https://pokeapi.co/api/v2/move/69/'),
        ('body-slam', 'Normal', 'https://pokeapi.co/api/v2/move/34/');

INSERT INTO items (name, url)
VALUES  ('soda-pop', 'https://pokeapi.co/api/v2/item/31/'),
        ('moomoo-milk', 'https://pokeapi.co/api/v2/item/33/'),
        ('escape-rope', 'https://pokeapi.co/api/v2/item/78/');

INSERT INTO abilities (name, url)
VALUES  ('speed-boost', 'https://pokeapi.co/api/v2/ability/3/'),
        ('justified', 'https://pokeapi.co/api/v2/ability/154/'),
        ('guts', 'https://pokeapi.co/api/v2/ability/62/');

INSERT INTO natures (name, url)
VALUES  ('adamant', 'https://pokeapi.co/api/v2/nature/11/'),
        ('jolly', 'https://pokeapi.co/api/v2/nature/16/');

-- INSERT INTO cards (nickname, gender, nature, ability, art, species_id, item)
-- VALUES ('Spicy', TRUE, 2, 1, 'inserturl', 257, 1),
--        ('Arnold', TRUE, 1, 3, 'inserturl', 68, 2),
--        ('Lancelot', TRUE, 1, 2, 'inserturl', 475, 3);
        
