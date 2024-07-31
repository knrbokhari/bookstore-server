import { Router, Express } from "express";

const router = Router();

router.get("/");
router.get("/:id");
router.get("/:id/books");
router.post("/");
router.put("/:id");
router.delete("/:id");

const authorsRoutesConfigure = (app: Express) => {
  app.use("/api/authors", router);
};

export default authorsRoutesConfigure;
