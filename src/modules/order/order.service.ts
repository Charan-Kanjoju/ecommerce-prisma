import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export class OrderService {
  static async placeOrder(userId: string) {
    return prisma.$transaction(async (tx) => {
      const client = tx as typeof prisma;
      const cart = await client.cart.findUnique({
        where: { userId },
        include: { items: true }
      });

      if (!cart || cart.items.length === 0)
        throw new Error("Cart is empty");

      // Calculate total safely using Decimal
      let totalAmount = new Prisma.Decimal(0);

      for (const item of cart.items) {
        totalAmount = totalAmount.add(item.totalPrice);
      }

      // Create Order
      const order = await client.order.create({
        data: {
          userId,
          totalAmount
        }
      });

      // Create Order Items
      for (const item of cart.items) {
        await client.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.totalPrice
          }
        });
      }

      // Clear Cart
      await client.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return order;
    });
  }

  static async getMyOrders(userId: string) {
    return prisma.order.findMany({
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
}