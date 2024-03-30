import { web } from "./../src/application/web";
import supertest from "supertest";
import { BookTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/books", () => {
  afterEach(async () => {
    await BookTest.delete();
  });

  it("should reject Create new book if request is invalid", async () => {
    const response = await supertest(web).post("/api/books").send({
      judul: "",
      penulis: "",
      harga: "",
      stok: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should create new book", async () => {
    const response = await supertest(web).post("/api/books").send({
      judul: "test",
      penulis: "test",
      harga: "test",
      stok: 100,
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.judul).toBe("test");
    expect(response.body.data.penulis).toBe("test");
    expect(response.body.data.harga).toBe("test");
    expect(response.body.data.stok).toBeDefined();
  });
});

describe("GET /api/books/:bookId", () => {
  beforeEach(async () => {
    await BookTest.create();
  });

  afterEach(async () => {
    await BookTest.delete();
  });

  it("should be able get book", async () => {
    const book = await BookTest.get();
    const response = await supertest(web).get(`/api/books/${book.id}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.judul).toBe(book.judul);
    expect(response.body.data.penulis).toBe(book.penulis);
    expect(response.body.data.harga).toBe(book.harga);
    expect(response.body.data.stok).toBe(book.stok);
  });

  it("should reject get book if book is not found", async () => {
    const book = await BookTest.get();
    const response = await supertest(web).get(`/api/books/${book.id + 1}`);

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/books/:bookId", () => {
  beforeEach(async () => {
    await BookTest.create();
  });

  afterEach(async () => {
    await BookTest.delete();
    await BookTest.deleteAll();
  });

  it("should be able to update book", async () => {
    const book = await BookTest.get();
    const response = await supertest(web).put(`/api/books/${book.id}`).send({
      judul: "Malin kundang",
      penulis: "Rendi hendra syahputra",
      harga: "100.000",
      stok: 5,
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(book.id);
    expect(response.body.data.judul).toBe("Malin kundang");
    expect(response.body.data.penulis).toBe("Rendi hendra syahputra");
    expect(response.body.data.harga).toBe("100.000");
    expect(response.body.data.stok).toBe(5);
  });

  it("should reject update book if request is invalid", async () => {
    const book = await BookTest.get();
    const response = await supertest(web).put(`/api/books/${book.id}`).send({
      judul: "",
      penulis: "",
      harga: "100.000",
      stok: 0,
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/books/:bookId", () => {
  beforeEach(async () => {
    await BookTest.create();
  });

  afterEach(async () => {
    await BookTest.delete();
  });

  it("should be able to remove book", async () => {
    const book = await BookTest.get();
    const response = await supertest(web).delete(`/api/books/${book.id}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject remove book if book is not found", async () => {
    const book = await BookTest.get();
    const response = await supertest(web).delete(`/api/books/${book.id + 1}`);

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/books/:bookId/list", () => {
  beforeEach(async () => {
    await BookTest.create();
  });
  afterEach(async () => {
    await BookTest.delete();
  });

  it("should be able to list book", async () => {
    const book = await BookTest.get();

    const response = await supertest(web).get(`/api/books/${book.id}/list`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  it("should reject list book if book is not found", async () => {
    const book = await BookTest.get();

    const response = await supertest(web).get(`/api/books/${book.id + 1}/list`);

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
