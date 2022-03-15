INSERT INTO pokemon (pokemon_id, name, gender, nature, ability, primary_type, secondary_type, item, move1, move2, move3, move4)
VALUES (257, 'Blaziken', TRUE, 'Adamant', 'Speed Boost', 'Fire', 'Fighting', 'Life Orb', 'Blaze Kick', 'Sky Uppercut', 'Brave Bird', 'Protect'),
        (160, 'Feraligatr', TRUE, 'Jolly', 'Sheer Force', 'Water', NULL, 'Life Orb', 'Crunch', 'Ice Fang', 'Waterfall', 'Superpower');

INSERT INTO users (username, password, favorite)
VALUES ('cooperdoon', 'letmein', 275),
       ('bigboynick', 'yum', 68);

INSERT INTO teams (name, pok1_id, pok2_id, pok3_id, pok4_id, pok5_id, pok6_id, trainer_id)
VALUES ('cteam', 1, 2, NULL, NULL, NULL, NULL, 1);
