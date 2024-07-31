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

export const createBookService = async (book: Book): Promise<Book> => {
  try {
    const isAuthor = await db("authors").where({ id: book.author_id }).first();

    if (!isAuthor) {
      throw new NotFound("Author Not Found!");
    }

    const [newBook] = await db("books").insert(book).returning("*");
    return newBook;
  } catch (error) {
    throw error;
  }
};

export const updateBookService = async (
  id: number,
  book: Book,
): Promise<Book> => {
  try {
    const isBook = await db("books").where({ id }).first();

    if (!isBook) {
      throw new NotFound("Book Not Found!");
    }

    const isAuthor = await db("authors").where({ id: book.author_id }).first();

    if (!isAuthor) {
      throw new NotFound("Author Not Found!");
    }

    const [updatedBook] = await db("books")
      .where({ id })
      .update(book)
      .returning("*");
    return updatedBook;
  } catch (error) {
    throw error;
  }
};
