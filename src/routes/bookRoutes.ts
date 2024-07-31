import { Router, Express } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  getBooksByAuthorId,
  updateBook,
} from "../controllers/bookController";
import { bookSchema, validate } from "../validators";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.get("/author/:id", getBooksByAuthorId);
router.post("/", validate(bookSchema), createBook);
router.put("/:id", validate(bookSchema), updateBook);
router.delete("/:id", deleteBook);

const booksRoutesConfigure = (app: Express) => {
  app.use("/api/books", router);
};

export default booksRoutesConfigure;
