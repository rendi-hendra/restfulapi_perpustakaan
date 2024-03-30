import { Book } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  BookResponse,
  CreateBookRequest,
  ListBookRequest,
  UpdateBookRequest,
  toBookResponse,
} from "../model/book-model";
import { BookValidation } from "../validation/book-validation";
import { Validation } from "../validation/validation";
import { validate } from "uuid";
import { Pageable } from "../model/page";

export class BookService {
  static async create(request: CreateBookRequest): Promise<BookResponse> {
    const createRequest = Validation.validate(BookValidation.CREATE, request);

    const totalBookWithSameJudul = await prismaClient.book.count({
      where: {
        judul: createRequest.judul,
      },
    });

    if (totalBookWithSameJudul != 0) {
      throw new ResponseError(400, "Judul already exists");
    }

    const book = await prismaClient.book.create({
      data: createRequest,
    });

    return toBookResponse(book);
  }

  static async checkBooktMustExists(bookId: number): Promise<Book> {
    const book = await prismaClient.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new ResponseError(404, "Book not found");
    }

    return book;
  }

  static async get(id: number): Promise<BookResponse> {
    const books = await this.checkBooktMustExists(id);
    return toBookResponse(books);
  }

  static async update(
    book: Book,
    request: UpdateBookRequest
  ): Promise<BookResponse> {
    const updateRequest = Validation.validate(BookValidation.UPDATE, request);
    await this.checkBooktMustExists(updateRequest.id);
    const books = await prismaClient.book.update({
      where: {
        id: book.id,
      },
      data: updateRequest,
    });

    return toBookResponse(books);
  }

  static async remove(book: Book, id: number): Promise<BookResponse> {
    await this.checkBooktMustExists(id);

    const books = await prismaClient.book.delete({
      where: {
        id: id,
      },
    });

    return toBookResponse(books);
  }

  static async list(request: ListBookRequest): Promise<Pageable<BookResponse>> {
    const ListRequest = Validation.validate(BookValidation.List, request);
    const skip = (ListRequest.page - 1) * ListRequest.size;

    const filters: any = [];

    const bookes = await prismaClient.book.findMany({
      where: {
        AND: filters,
      },
      take: ListRequest.size,
      skip: skip,
    });

    const total = await prismaClient.book.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: bookes.map((book) => toBookResponse(book)),
      paging: {
        current_page: ListRequest.page,
        total_page: Math.ceil(total / ListRequest.size),
        size: ListRequest.size,
      },
    };

    // return bookes.map((book) => toBookResponse(book));
  }
}
