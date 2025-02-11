/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import db from "../db/knex";
import { Book, PaginatedBook } from "../types";
import { BadRequest, NotFound } from "../utils/error";

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

export const deleteBookService = async (id: number): Promise<boolean> => {
  try {
    const isBook = await db("books").where({ id }).first();

    if (!isBook) {
      throw new NotFound("Book Not Found!");
    }

    const rowsAffected = await db("books").where({ id }).del();
    return rowsAffected > 0;
  } catch (error) {
    throw error;
  }
};

export const getBooksByAuthorIdService = async (
  authorId: number,
  page: number,
  limit: number,
): Promise<PaginatedBook> => {
  try {
    if (isNaN(authorId) || authorId <= 0) {
      throw new BadRequest("Invalid authorId");
    }

    const isAuthor = await db("authors").where({ id: authorId }).first();

    if (!isAuthor) {
      throw new NotFound("Author Not Found!");
    }

    const offset = (page - 1) * limit;

    // Fetch the total number of books
    const totalItemsResult: any = await db("books")
      .where({ author_id: authorId })
      .count({ count: "*" })
      .first();
    const totalItems: number = parseInt(totalItemsResult?.count || "0", 10);

    // Ensure page is within valid range
    const totalPages: number = Math.ceil(totalItems / limit);
    if (page > totalPages) {
      page = totalPages;
    }

    // Fetch the books for the current page
    const books: Book[] = await db("books")
      .where({ author_id: authorId })
      .select("*")
      .limit(limit)
      .offset(offset);

    return {
      totalItems,
      currentPage: page,
      totalPages,
      limit,
      items: books,
    };
  } catch (error) {
    throw error;
  }
};
