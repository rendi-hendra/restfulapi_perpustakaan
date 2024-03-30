import { Book } from "@prisma/client";
import { prismaClient } from "./../src/application/database";
export class BookTest {
  static async delete() {
    await prismaClient.book.deleteMany({
      where: {
        judul: "test",
      },
    });
  }

  static async deleteAll() {
    await prismaClient.book.deleteMany({
      where: {
        judul: "Malin kundang",
      },
    });
  }

  static async create() {
    await prismaClient.book.create({
      data: {
        judul: "test",
        penulis: "test",
        harga: "test",
        stok: 100,
      },
    });
  }

  static async get(): Promise<Book> {
    const user = await prismaClient.book.findFirst({
      where: {
        judul: "test",
      },
    });

    if (!user) {
      throw new Error("Book is not found");
    }

    return user;
  }
}
