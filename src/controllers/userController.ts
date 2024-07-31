import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { loginService, registerService } from "../services/userService";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  await registerService({ username, password });
  res
    .status(200)
    .json({ success: true, message: "User registered successfully" });
});

export const Login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const token = await loginService({ username, password });
  res
    .status(200)
    .json({ success: true, token, message: "User registered successfully" });
});
