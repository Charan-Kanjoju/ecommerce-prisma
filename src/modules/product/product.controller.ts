import { Request, Response } from "express";
import { ProductService } from "./product.service";

export class ProductController {
  static async create(req: any, res: Response) {
    const product = await ProductService.create(req.body, req.user.id);
    res.status(201).json(product);
  }

  static async getAll(req: Request, res: Response) {
    const products = await ProductService.getAll();
    res.json(products);
  }
  static async getById(req: Request, res: Response) {
  const product = await ProductService.getById(req.params.id);
  res.json(product);
}

  static async update(req: any, res: Response) {
    const product = await ProductService.update(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json(product);
  }

  static async delete(req: any, res: Response) {
    await ProductService.delete(req.params.id, req.user.id);
    res.json({ message: "Deleted successfully" });
  }
}