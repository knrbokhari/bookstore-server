import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBookByIdService,
  getBooksByAuthorIdService,
  updateBookService,
} from "../services/bookService";

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const result = await getAllBooksService(pageNum, limitNum);
  res.status(200).json({ success: true, data: result, message: "Sucessfull" });
});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const result = await getBookByIdService(id);
  res.status(200).json({ success: true, data: result, message: "Sucessfull" });
});

export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, published_date, author_id } = req.body;
  const result = await createBookService({
    title,
    description,
    published_date,
    author_id,
  });
  res.status(200).json({ success: true, data: result, message: "Sucessfull" });
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, published_date, author_id } = req.body;
  const result = await updateBookService(id, {
    title,
    description,
    published_date,
    author_id,
  });
  res.status(200).json({ success: true, data: result, message: "Sucessfull" });
});

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await deleteBookService(id);
  res.status(200).json({ success: true, message: "Sucessfull" });
});

export const getBooksByAuthorId = asyncHandler(
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
