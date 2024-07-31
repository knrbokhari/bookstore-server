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
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.get("/author/:id", getBooksByAuthorId);
router.post("/", authenticateToken, validate(bookSchema), createBook);
router.put("/:id", authenticateToken, validate(bookSchema), updateBook);
router.delete("/:id", authenticateToken, deleteBook);

const booksRoutesConfigure = (app: Express) => {
  app.use("/api/books", router);
};

export default booksRoutesConfigure;
