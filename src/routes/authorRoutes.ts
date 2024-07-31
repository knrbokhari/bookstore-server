import { Router, Express } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthorById,
  getBooksWrittenByAuthorId,
  updateAuthor,
} from "../controllers/authorController";

const router = Router();

router.get("/", getAuthor);
router.get("/:id", getAuthorById);
router.get("/:id/books", getBooksWrittenByAuthorId);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

const authorsRoutesConfigure = (app: Express) => {
  app.use("/api/authors", router);
};

export default authorsRoutesConfigure;
