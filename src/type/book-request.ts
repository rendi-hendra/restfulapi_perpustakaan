import { Book } from "@prisma/client";
import { Request } from "express";

export interface BookRequest extends Request {
  book?: Book;
}
