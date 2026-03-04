import prisma from "../../config/prisma";
export class CartService {
    // Get cart with populated product details
    static async getCart(userId) {
        return prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }
    // Add or Update product in cart
    static async addToCart(userId, productId, quantity) {
        if (!quantity || quantity <= 0)
            throw new Error("Quantity must be greater than 0");
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });
        if (!product)
            throw new Error("Product not found");
        let cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId }
            });
        }
        const totalPrice = product.price.mul(quantity);
        return prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId
                }
            },
            update: {
                quantity,
                totalPrice
            },
            create: {
                cartId: cart.id,
                productId,
                quantity,
                totalPrice
            }
        });
    }
    // Update Quantity
    static async updateQuantity(userId, productId, quantity) {
        if (quantity <= 0)
            throw new Error("Quantity must be greater than 0");
        const cart = await prisma.cart.findUnique({
            where: { userId }
        });
        if (!cart)
            throw new Error("Cart not found");
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });
        if (!product)
            throw new Error("Product not found");
        const totalPrice = product.price.mul(quantity);
        return prisma.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId
                }
            },
            data: {
                quantity,
                totalPrice
            }
        });
    }
    // Remove Item
    static async removeItem(userId, productId) {
        const cart = await prisma.cart.findUnique({
            where: { userId }
        });
        if (!cart)
            throw new Error("Cart not found");
        return prisma.cartItem.delete({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId
                }
            }
        });
    }
}
