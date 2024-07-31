import { Router, Express } from "express";
import { userSchema, validate } from "../validators";
import { Login, register } from "../controllers/userController";

const router = Router();

router.post("/register", validate(userSchema), register);
router.post("/login", validate(userSchema), Login);

const authRoutesConfigure = (app: Express) => {
  app.use("/api/users", router);
};

export default authRoutesConfigure;
