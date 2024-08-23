#! /usr/bin/env node

// This script is only meant to be ran once

const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const dbURL = process.argv[2];

if (!dbURL) {
  console.error('Please provide a database URL as an argument.');
  process.exit(1);
}

const main = async () => {
  console.log('Seeding database...');
  const client = new Client({
    connectionString: dbURL,
  });

  try {
    await client.connect();

    const hashedPasswords = await Promise.all([
      bcrypt.hash('123thebestPAINTERofalltime!', 10),
      bcrypt.hash('iLOVEfruitsandveggies100!', 10),
      bcrypt.hash('iLIKEfastfood50!', 10),
    ]);

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
      ('Bob', 'Ross', 'iambobross', '${hashedPasswords[0]}', 'guest'),
      ('Secret', 'Member', 'iamasecretmember', '${hashedPasswords[1]}', 'guest'),
      ('Super', 'Member', 'iamanothersecretmember', '${hashedPasswords[2]}', 'guest');


    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title TEXT,
      message TEXT,
      timestamp TIMESTAMP WITHOUT TIME ZONE,
      author_id INTEGER
    );

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'messages_author_fkey'
      ) THEN
        ALTER TABLE messages
        ADD CONSTRAINT messages_author_fkey
        FOREIGN KEY (author) REFERENCES users(id);
      END IF;
    END $$;

    INSERT INTO messages (title, message, timestamp, author) VALUES
      ('My favorite painting', 'My favorite painting is "Mountain Retreat."', NOW(), 1),
      ('Seasons', 'This message was written in summer!', NOW(), 2),
      ('Coding', 'JavaScript is cool.', NOW(), 3),
      ('Coding', 'Front-end > back-end!', NOW(), 3);
    `;

    await client.query(SQL);
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
};

main();
