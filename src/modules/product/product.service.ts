import prisma from "../../config/prisma";


export class ProductService {
  static async create(data: any, sellerId: string) {
    return prisma.product.create({
      data: { ...data, sellerId }
    });
  }

  static async getAll() {
    return prisma.product.findMany();
  }

  static async update(id: string, sellerId: string, data: any) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || product.sellerId !== sellerId)
      throw new Error("Not allowed");

    return prisma.product.update({ where: { id }, data });
  }

  static async delete(id: string, sellerId: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || product.sellerId !== sellerId)
      throw new Error("Not allowed");

    return prisma.product.delete({ where: { id } });
  }
}