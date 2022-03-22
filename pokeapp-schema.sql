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
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    favorite_id INTEGER 
        REFERENCES species (id) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(15) NOT NULL,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE
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
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    nature_id INTEGER 
        REFERENCES natures (id) ON DELETE SET NULL,
    ability_id INTEGER 
        REFERENCES abilities (id) ON DELETE SET NULL,
    species_id INTEGER 
        REFERENCES species (id) NOT NULL,
    item_id INTEGER 
        REFERENCES items (id) ON DELETE SET NULL
);


-- CREATE TABLE IF NOT EXISTS users_cards (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(25) REFERENCES users,
--     card_id INTEGER REFERENCES cards (id)
-- );

CREATE TABLE IF NOT EXISTS teams_cards (
    id SERIAL PRIMARY KEY,
    card_id INTEGER REFERENCES cards (id) ON DELETE CASCADE,
    team_id INTEGER REFERENCES teams (id) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS users_teams (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(25) REFERENCES users,
--     team_id INTEGER REFERENCES teams (id)
-- );

CREATE TABLE IF NOT EXISTS cards_moves (
    id SERIAL PRIMARY KEY,
    card_id INTEGER REFERENCES cards (id) ON DELETE CASCADE,
    move_id INTEGER REFERENCES moves (id) ON DELETE CASCADE
    
);
