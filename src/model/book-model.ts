import { Book } from "@prisma/client";

export type BookResponse = {
  id: number;
  judul: string;
  penulis: string;
  harga: string;
  stok: number;
};

export type CreateBookRequest = {
  judul: string;
  penulis: string;
  harga: string;
  stok: number;
};

export type UpdateBookRequest = {
  id: number;
  judul: string;
  penulis: string;
  harga: string;
  stok: number;
};

export type ListBookRequest = {
  page: number;
  size: number;
};

export function toBookResponse(book: Book): BookResponse {
  return {
    id: book.id,
    judul: book.judul,
    penulis: book.penulis,
    harga: book.harga,
    stok: book.stok,
  };
}
