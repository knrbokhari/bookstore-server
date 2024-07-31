import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { Author, AuthorQuery, Emty, PaginatedAuthor } from "../types";
import {
  createAuthorService,
  deleteAuthorService,
  getAllAuthors,
  getAuthorByIdService,
  updateAuthorService,
} from "../services/authorService";
import { getBooksByAuthorIdService } from "../services/bookService";

export const getAuthor = asyncHandler(
  async (req: Request<Emty, Emty, Emty, AuthorQuery>, res: Response) => {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;

    const result: PaginatedAuthor = await getAllAuthors(page, limit);
    res
      .status(200)
      .json({ success: true, result: result, message: "Sucessfull" });
  },
);

export const getAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    const result: Author | null = await getAuthorByIdService(id);
    res
      .status(200)
      .json({ success: true, result: result, message: "Sucessfull" });
  },
);

export const createAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, bio, birthdate } = req.body;

    const result: Author = await createAuthorService({
      name,
      bio,
      birthdate,
    });
    res
      .status(200)
      .json({ success: true, result: result, message: "Sucessfull" });
  },
);

export const updateAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { name, bio, birthdate } = req.body;

    const result = await updateAuthorService(id, {
      name,
      bio,
      birthdate,
    });
    res
      .status(200)
      .json({ success: true, result: result, message: "Sucessfull" });
  },
);

export const deleteAuthor = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await deleteAuthorService(id);
  res.status(200).json({ success: true, message: "Sucessfull" });
};

export const getBooksWrittenByAuthorId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const result = await getBooksByAuthorIdService(id, pageNum, limitNum);

    res
      .status(200)
      .json({ success: true, data: result, message: "Sucessfull" });
  },
);
