import { Router, Express } from "express";

const router = Router();

router.get("/");
router.get("/:id");
router.get("/author/:id");
router.post("/");
router.put("/:id");
router.delete("/:id");

const booksRoutesConfigure = (app: Express) => {
  app.use("/api/books", router);
};

export default booksRoutesConfigure;
