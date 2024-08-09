#! /usr/bin/env node

// This script is only meant to be ran once

const { Client } = require('pg');

const dbURL = process.argv[2];

if (!dbURL) {
  console.error('Please provide a database URL as an argument.');
  process.exit(1);
}

const SQL = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
    CREATE TYPE status AS ENUM ('guest', 'member', 'admin');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 50 ),
  last_name VARCHAR ( 100 ),
  username VARCHAR ( 50 ),
  password VARCHAR ( 255 ),
  membership_status status
);

INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES
  ('Bob', 'Ross', 'iambobross', 'thebestPAINTERofalltime!', 'guest'),
  ('Secret', 'Member', 'iamasecretmember', 'ilikefruitsandveggies', 'guest'),
  ('Super', 'Member', 'iamanothersecretmember', 'ilikefastfood!', 'guest');
`;

async function main() {
  console.log('Seeding database...');
  const client = new Client({
    connectionString: dbURL,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

main();
