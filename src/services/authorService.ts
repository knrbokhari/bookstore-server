/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import db from "../db/knex";
import { Author, PaginatedAuthor } from "../types";
import { NotFound } from "../utils/error";

export const getAllAuthors = async (
  page: number,
  limit: number,
): Promise<PaginatedAuthor> => {
  try {
    const offset: number = (page - 1) * limit;

    // Fetch the total number of authors
    const totalItemsResult: any = await db("authors")
      .count({ count: "*" })
      .first();
    const totalItems: number = parseInt(totalItemsResult?.count || 0);

    // Fetch the authors for the current page
    const authors: Author[] = await db("authors")
      .select("*")
      .limit(limit)
      .offset(offset);

    // Calculate the total number of pages
    const totalPages: number = Math.ceil(totalItems / limit);

    return {
      totalItems,
      currentPage: page,
      totalPages,
      limit,
      items: authors,
    };
  } catch (error) {
    throw error;
  }
};

export const getAuthorByIdService = async (
  id: number,
): Promise<Author | null> => {
  try {
    const author: Author = await db("authors").where({ id }).first();

    if (!author) {
      throw new NotFound("Author Not Found!");
    }

    return author;
  } catch (error) {
    throw error;
  }
};

export const createAuthorService = async (author: Author): Promise<Author> => {
  try {
    const [newAuthor] = await db("authors").insert(author).returning("*");
    return newAuthor;
  } catch (error) {
    throw error;
  }
};

export const updateAuthorService = async (
  id: number,
  author: Author,
): Promise<Author | null> => {
  try {
    const isAuthor = await db("authors").where({ id }).first();

    if (!isAuthor) {
      throw new NotFound("author not found");
    }

    const [updatedAuthor] = await db("authors")
      .where({ id })
      .update(author)
      .returning("*");
    return updatedAuthor || null;
  } catch (error) {
    throw error;
  }
};

export const deleteAuthorService = async (id: number): Promise<boolean> => {
  try {
    const rowsAffected = await db("authors").where({ id }).del();
    return rowsAffected > 0;
  } catch (error) {
    throw error;
  }
};
