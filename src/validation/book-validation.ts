import { ZodType, z } from "zod";

export class BookValidation {
  static readonly CREATE: ZodType = z.object({
    judul: z.string().min(4).max(255),
    penulis: z.string().min(4).max(100),
    harga: z.string().min(4).max(100),
    stok: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    judul: z.string().min(4).max(255),
    penulis: z.string().min(4).max(100),
    harga: z.string().min(4).max(100),
    stok: z.number().positive(),
  });

  static readonly List: ZodType = z.object({
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
