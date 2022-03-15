-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/HLxrLt
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    pokemon_id INTEGER,
    name TEXT,
    gender BOOLEAN NOT NULL DEFAULT TRUE,
    nature TEXT NOT NULL,
    ability TEXT NOT NULL,
    sprite TEXT,
    type1 TEXT NOT NULL,
    type2 TEXT,
    item TEXT,
    move1 TEXT,
    move2 TEXT,
    move3 TEXT,
    move4 TEXT
);


CREATE TABLE trainers (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    favorite TEXT
);


CREATE TABLE teams (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(15) NOT NULL,
    pok1_id INTEGER,
    pok2_id INTEGER,
    pok3_id INTEGER,
    pok4_id INTEGER,
    pok5_id INTEGER,
    pok6_id INTEGER,
    trainer_id INTEGER NOT NULL 
);


-- CREATE TABLE "Move" (
--     "ID" INTEGER NOT NULL ,
--     "Name" TEXT NOT NULL ,
--     "Type" TEXT NOT NULL ,
--     "Power" INTEGER NOT NULL ,
--     "PP" INTEGER NOT NULL ,
--     CONSTRAINT "pk_Move" PRIMARY KEY (
--         "ID"
--     )
-- );


-- CREATE TABLE "Item" (
--     "ID" INTEGER NOT NULL ,
--     "Name" TEXT NOT NULL ,
--     "Description" TEXT NOT NULL ,
--     "Sprite" TEXT NOT NULL ,
--     CONSTRAINT "pk_Item" PRIMARY KEY (
--         "ID"
--     )
-- );


-- CREATE TABLE "Nature" (
--     "ID" INTEGER NOT NULL ,
--     "Name" TEXT NOT NULL ,
--     "Dec_Stat" TEXT NOT NULL ,
--     "Inc_Stat" TEXT NOT NULL ,
--     CONSTRAINT "pk_Nature" PRIMARY KEY (
--         "ID"
--     )
-- )


-- CREATE TABLE "Ability" (
--     "ID" INTEGER NOT NULL ,
--     "Name" TEXT NOT NULL ,
--     "Description" TEXT NOT NULL ,
--     CONSTRAINT "pk_Ability" PRIMARY KEY (
--         "ID"
--     )
-- )

