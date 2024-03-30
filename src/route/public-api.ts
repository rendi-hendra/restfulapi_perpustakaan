import express from "express";
import { BookController } from "../controller/book-controller";
export const publicRouter = express.Router();
publicRouter.post("/api/books", BookController.create);
publicRouter.get("/api/books/:bookId(\\d+)", BookController.get);
publicRouter.put("/api/books/:bookId(\\d+)", BookController.update);
publicRouter.delete("/api/books/:bookId(\\d+)", BookController.remove);
publicRouter.get("/api/books/", BookController.list);
