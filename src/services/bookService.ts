/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import db from "../db/knex";
import { Book, PaginatedBook } from "../types";
import { NotFound } from "../utils/error";

export const getAllBooksService = async (
  page: number,
  limit: number,
): Promise<PaginatedBook> => {
  try {
    const offset = (page - 1) * limit;

    // Fetch the total number of books
    const totalItemsResult: any = await db("books")
      .count({ count: "*" })
      .first();
    const totalItems: number = parseInt(totalItemsResult?.count || 0);

    // Fetch the books for the current page
    const authors: Book[] = await db("books")
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

export const getBookByIdService = async (id: number): Promise<Book> => {
  try {
    const book = await db("books").where({ id }).first();

    if (!book) {
      throw new NotFound("Book Not Found!");
    }

    return book;
  } catch (error) {
    throw error;
  }
};
