import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("authors").del();
  // Inserts seed entries
  await knex("authors").insert([
    {
      id: 1,
      name: "Author One",
      bio: "Bio of Author One",
      birthdate: "1970-01-01",
    },
    {
      id: 2,
      name: "Author Two",
      bio: "Bio of Author Two",
      birthdate: "1980-02-02",
    },
    {
      id: 3,
      name: "Author Three",
      bio: "Bio of Author Three",
      birthdate: "1990-03-03",
    },
  ]);
}
