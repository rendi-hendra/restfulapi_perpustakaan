import { NextFunction, Request, Response } from "express";
import {
  CreateBookRequest,
  ListBookRequest,
  UpdateBookRequest,
} from "../model/book-model";
import { BookService } from "../service/book-service";
import { BookRequest } from "../type/book-request";
import { logger } from "../application/logging";

export class BookController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateBookRequest = req.body as CreateBookRequest;
      const response = await BookService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = Number(req.params.bookId);
      const response = await BookService.get(bookId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateBookRequest = req.body as UpdateBookRequest;
      request.id = Number(req.params.bookId);
      const response = await BookService.update(req.body, request);
      logger.debug("TESTINGGGGGG : " + JSON.stringify(response));
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: BookRequest, res: Response, next: NextFunction) {
    try {
      const bookId = Number(req.params.bookId);
      const response = await BookService.remove(req.book!, bookId);
      logger.debug("response : " + JSON.stringify(response));
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: BookRequest, res: Response, next: NextFunction) {
    try {
      const request: ListBookRequest = {
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await BookService.list(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
