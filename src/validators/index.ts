/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Joi schema for author validation
export const authorSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
    "string.base": "Name must be a string",
  }),
  bio: Joi.string().allow(null, "").messages({
    "string.base": "Bio must be a string",
  }),
  birthdate: Joi.date().required().messages({
    "any.required": "Birthdate is required",
    "date.base": "Birthdate must be a valid date",
  }),
});

// Joi schema for book validation
export const bookSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
    "string.base": "Name must be a string",
  }),
  description: Joi.string().allow(null, "").messages({
    "string.base": "Description must be a string",
  }),
  published_date: Joi.date().required().messages({
    "any.required": "Published date is required",
    "date.base": "Published date must be a valid date",
  }),
  author_id: Joi.number().integer().required().messages({
    "any.required": "Author ID is required",
    "number.base": "Author ID must be a number",
    "number.integer": "Author ID must be an integer",
  }),
});

// Joi schema for user validation
export const userSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
    "string.base": "Username must be a string",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.base": "Password must be a string",
  }),
});

export const validate =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (!error) {
      return next();
    }

    const { details } = error;
    const extractedErrors: any[] = [];

    details.forEach((err) => {
      extractedErrors.push({
        [err.path.join(".")]: err.message,
      });
    });

    return res.status(422).json({
      success: false,
      errors: extractedErrors,
    });
  };
