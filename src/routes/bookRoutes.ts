import { Router, Express } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/bookController";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.get("/author/:id");
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

const booksRoutesConfigure = (app: Express) => {
  app.use("/api/books", router);
};

export default booksRoutesConfigure;
