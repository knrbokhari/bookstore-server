/* eslint-disable no-useless-catch */
import db from "../db/knex";
import { User } from "../types";
import { BadRequest, NotFound } from "../utils/error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async (user: User) => {
  try {
    const { username, password } = user;
    const isUser = await db("users").where({ username }).first();

    if (isUser) {
      throw new BadRequest("User Alrady exits with this username!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db("users")
      .insert({ username, password: hashedPassword })
      .returning("*");

    return;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (userData: User) => {
  try {
    const { username, password } = userData;
    const user = await db("users").where({ username }).first();

    if (!user) {
      throw new NotFound("User Not Found!");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequest("Invalid credentials");
    }

    const secretKey = process.env.SECRET_KEY || "secretKey";
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" },
    );

    return token;
  } catch (error) {
    throw error;
  }
};
