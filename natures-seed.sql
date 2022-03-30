CREATE TABLE IF NOT EXISTS "natures" (
    id SERIAL PRIMARY KEY,
    name TEXT,
    url TEXT
);
INSERT INTO "natures" (name, url)
VALUES
    ('hardy','https://pokeapi.co/api/v2/nature/1/'),
    ('bold','https://pokeapi.co/api/v2/nature/2/'),
    ('modest','https://pokeapi.co/api/v2/nature/3/'),
    ('calm','https://pokeapi.co/api/v2/nature/4/'),
    ('timid','https://pokeapi.co/api/v2/nature/5/'),
    ('lonely','https://pokeapi.co/api/v2/nature/6/'),
    ('docile','https://pokeapi.co/api/v2/nature/7/'),
    ('mild','https://pokeapi.co/api/v2/nature/8/'),
    ('gentle','https://pokeapi.co/api/v2/nature/9/'),
    ('hasty','https://pokeapi.co/api/v2/nature/10/'),
    ('adamant','https://pokeapi.co/api/v2/nature/11/'),
    ('impish','https://pokeapi.co/api/v2/nature/12/'),
    ('bashful','https://pokeapi.co/api/v2/nature/13/'),
    ('careful','https://pokeapi.co/api/v2/nature/14/'),
    ('rash','https://pokeapi.co/api/v2/nature/15/'),
    ('jolly','https://pokeapi.co/api/v2/nature/16/'),
    ('naughty','https://pokeapi.co/api/v2/nature/17/'),
    ('lax','https://pokeapi.co/api/v2/nature/18/'),
    ('quirky','https://pokeapi.co/api/v2/nature/19/'),
    ('naive','https://pokeapi.co/api/v2/nature/20/'),
    ('brave','https://pokeapi.co/api/v2/nature/21/'),
    ('relaxed','https://pokeapi.co/api/v2/nature/22/'),
    ('quiet','https://pokeapi.co/api/v2/nature/23/'),
    ('sassy','https://pokeapi.co/api/v2/nature/24/'),
    ('serious','https://pokeapi.co/api/v2/nature/25/');
