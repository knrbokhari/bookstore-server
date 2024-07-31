import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("books").del();
  // Inserts seed entries
  await knex("books").insert([
    {
      id: 1,
      title: "Book One",
      description: "Description of Book One",
      published_date: "2001-01-01",
      author_id: 1,
    },
    {
      id: 2,
      title: "Book Two",
      description: "Description of Book Two",
      published_date: "2002-02-02",
      author_id: 1,
    },
    {
      id: 3,
      title: "Book Three",
      description: "Description of Book Three",
      published_date: "2003-03-03",
      author_id: 2,
    },
    {
      id: 4,
      title: "Book Four",
      description: "Description of Book Four",
      published_date: "2004-04-04",
      author_id: 2,
    },
    {
      id: 5,
      title: "Book Five",
      description: "Description of Book Five",
      published_date: "2005-05-05",
      author_id: 3,
    },
  ]);
}
