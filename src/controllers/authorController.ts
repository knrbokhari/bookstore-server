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
// eslint-disable-next-line no-useless-catch

export const getAuthor = asyncHandler(
  async (req: Request<Emty, Emty, Emty, AuthorQuery>, res: Response) => {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;

    const authors: PaginatedAuthor = await getAllAuthors(page, limit);
    res
      .status(200)
      .json({ success: true, result: authors, message: "Sucessfull" });
  },
);

export const getAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    const author: Author | null = await getAuthorByIdService(id);
    res
      .status(200)
      .json({ success: true, result: author, message: "Sucessfull" });
  },
);

export const createAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, bio, birthdate } = req.body;

    const newAuthor: Author = await createAuthorService({
      name,
      bio,
      birthdate,
    });
    res
      .status(200)
      .json({ success: true, result: newAuthor, message: "Sucessfull" });
  },
);

export const updateAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { name, bio, birthdate } = req.body;

    const updatedAuthor = await updateAuthorService(id, {
      name,
      bio,
      birthdate,
    });
    res
      .status(200)
      .json({ success: true, result: updatedAuthor, message: "Sucessfull" });
  },
);

export const deleteAuthor = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await deleteAuthorService(id);
  res.status(200).json({ success: true, message: "Sucessfull" });
};
