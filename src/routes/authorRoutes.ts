import { Router, Express } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthorById,
  getBooksWrittenByAuthorId,
  updateAuthor,
} from "../controllers/authorController";
import { authorSchema, validate } from "../validators";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.get("/", getAuthor);
router.get("/:id", getAuthorById);
router.get("/:id/books", getBooksWrittenByAuthorId);
router.post("/", authenticateToken, validate(authorSchema), createAuthor);
router.put("/:id", authenticateToken, validate(authorSchema), updateAuthor);
router.delete("/:id", authenticateToken, deleteAuthor);

const authorsRoutesConfigure = (app: Express) => {
  app.use("/api/authors", router);
};

export default authorsRoutesConfigure;
