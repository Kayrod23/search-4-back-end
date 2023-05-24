DROP DATABASE IF EXISTS items_dev;
CREATE DATABASE items_dev;

\c items_dev;

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
-- )

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    cost DECIMAL(10,2) NOT NULL CHECK (cost >= 0),
    quantity TEXT NOT NULL,
    category TEXT,
    description TEXT,
    email Text
);

-- CREATE TABLE cart (
--     id SERIAL PRIMARY KEY,
--     item_id INTEGER NOT NULL REFERENCES items (id)
-- );
