import { ProductService } from "./product.service";
export class ProductController {
    static async create(req, res) {
        const product = await ProductService.create(req.body, req.user.id);
        res.status(201).json(product);
    }
    static async getAll(req, res) {
        const products = await ProductService.getAll();
        res.json(products);
    }
    static async update(req, res) {
        const product = await ProductService.update(req.params.id, req.user.id, req.body);
        res.json(product);
    }
    static async delete(req, res) {
        await ProductService.delete(req.params.id, req.user.id);
        res.json({ message: "Deleted successfully" });
    }
}
