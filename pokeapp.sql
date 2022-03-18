\echo 'Delete and recreate pokeapp db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pokeapp;
CREATE DATABASE pokeapp;
\connect pokeapp

\i species-seed.sql
\i pokeapp-schema.sql
\i pokeapp-seed.sql

\echo 'Delete and recreate pokeapp_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pokeapp_test;
CREATE DATABASE pokeapp_test;
\connect pokeapp_test

\i species-seed.sql
\i pokeapp-schema.sql
