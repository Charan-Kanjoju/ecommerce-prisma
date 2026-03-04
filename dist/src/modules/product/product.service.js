import prisma from "../../config/prisma";
export class ProductService {
    static async create(data, sellerId) {
        return prisma.product.create({
            data: { ...data, sellerId }
        });
    }
    static async getAll() {
        return prisma.product.findMany();
    }
    static async update(id, sellerId, data) {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product || product.sellerId !== sellerId)
            throw new Error("Not allowed");
        return prisma.product.update({ where: { id }, data });
    }
    static async delete(id, sellerId) {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product || product.sellerId !== sellerId)
            throw new Error("Not allowed");
        return prisma.product.delete({ where: { id } });
    }
}
