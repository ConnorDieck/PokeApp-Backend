INSERT INTO users (username, password, favorite_id)
VALUES ('cooperdoon', '$2b$12$5glPdbzCW2QUV/bjgeXyfuG9lOttWWZth9h.pBU0MnmGjz83zMtU.', 288),
       ('bigboynick', '$2b$12$23/HvzsxfpSZD5iK8RyC9uHOCbH0Yd5f.tqegE15HE3YipLVB8nby', 101),
       ('chadmaster', '$2b$12$pR51w4evQVmFdoLCyABpFejcex7lxqQEB/54UYAqLVkMdKjBFdUku', 508);
-- VALUES ('cooperdoon', 'letmein', 257),
--        ('bigboynick', 'yum', 68),
--        ('chadmaster', 'passwordle', 475);

INSERT INTO teams (name, username)
VALUES ('cooperteam', 'cooperdoon'),
        ('nickteam', 'bigboynick'),
        ('chadders', 'chadmaster');

INSERT INTO moves (name, url)
VALUES  ('swords-dance', 'https://pokeapi.co/api/v2/move/14/'),
        ('mega-punch', 'https://pokeapi.co/api/v2/move/5/'),
        ('thunder-punch', 'https://pokeapi.co/api/v2/move/9/'),
        ('counter', 'https://pokeapi.co/api/v2/move/68/'),
        ('seismic-toss', 'https://pokeapi.co/api/v2/move/69/'),
        ('body-slam', 'https://pokeapi.co/api/v2/move/34/');

-- INSERT INTO items (name, url)
-- VALUES  ('soda-pop', 'https://pokeapi.co/api/v2/item/31/'),
--         ('moomoo-milk', 'https://pokeapi.co/api/v2/item/33/'),
--         ('escape-rope', 'https://pokeapi.co/api/v2/item/78/');

INSERT INTO abilities (name, url)
VALUES  ('speed-boost', 'https://pokeapi.co/api/v2/ability/3/'),
        ('justified', 'https://pokeapi.co/api/v2/ability/154/'),
        ('guts', 'https://pokeapi.co/api/v2/ability/62/');


INSERT INTO cards (name, gender, url, username, nature, ability, species_id, item)
VALUES ('Bulby', TRUE, 'https://pokeapi.co/api/v2/pokemon/1/', 'cooperdoon', 'bold', 'guts', 1, 'adrenaline-orb'),
	('Ivy', FALSE, 'https://pokeapi.co/api/v2/pokemon/2/', 'cooperdoon', 'jolly', 'guts', 2, 'terrain-extender'),
	('Veevee', FALSE, 'https://pokeapi.co/api/v2/pokemon/3/', 'bigboynick', 'adamant', 'guts', 3, 'room-service');

INSERT INTO cards_moves (card_id, move)
VALUES (1, 'swords-dance'),
	(1, 'mega-punch'),
	(1, 'thunder-punch'),
	(1, 'counter'),
	(2, 'swords-dance'),
	(2, 'mega-punch'),
	(2, 'thunder-punch'),
	(2, 'counter');