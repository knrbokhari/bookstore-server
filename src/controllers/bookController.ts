import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { getAllBooksService } from "../services/bookService";

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const result = await getAllBooksService(pageNum, limitNum);
  res.status(200).json({ success: true, data: result, message: "Sucessfull" });
});
