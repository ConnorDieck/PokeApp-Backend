/** Schema for PokeApp DB */

/** species table will be added in species-seed.sql */

-- CREATE TABLE IF NOT EXISTS species (
--     id SERIAL PRIMARY KEY,
--     pokedex_no INTEGER,
--     name TEXT,
--     url TEXT,
--     sprite TEXT,
--     type1 TEXT NOT NULL,
--     type2 TEXT
-- );

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    favorite_id INTEGER REFERENCES species (id) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(15) NOT NULL
);


CREATE TABLE IF NOT EXISTS moves (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    type TEXT,
    url TEXT UNIQUE
);


CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    url TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS abilities (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    url TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS natures (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    url TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(15),
    gender BOOLEAN NOT NULL DEFAULT TRUE,
    art TEXT,
    nature_id INTEGER REFERENCES natures (id),
    ability_id INTEGER REFERENCES abilities (id),
    species_id INTEGER REFERENCES species (id) NOT NULL,
    item_id INTEGER REFERENCES items (id)
);


CREATE TABLE IF NOT EXISTS users_cards (
    id SERIAL PRIMARY KEY,
    card_id INTEGER REFERENCES cards (id),
    user_id INTEGER REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS teams_cards (
    id SERIAL PRIMARY KEY,
    card_id INTEGER REFERENCES cards (id),
    team_id INTEGER REFERENCES teams (id)
);

CREATE TABLE IF NOT EXISTS users_teams (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams (id),
    user_id INTEGER REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS cards_moves (
    id SERIAL PRIMARY KEY,
    move_id INTEGER REFERENCES moves (id),
    card_id INTEGER REFERENCES cards (id)
);
