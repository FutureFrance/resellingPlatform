import { Response, NextFunction } from 'express';
import { ISpot, IRequest, ICustomHeaders, IProduct } from '../interfaces/RequestInterfaces';
import { validationResult } from 'express-validator';
import { ProductService } from '../services/ProductService';
import { ApiError } from '../exceptions/ErrorHandler';

class ProductController {
    async createProduct(req: IRequest<ISpot, ICustomHeaders>, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw next(ApiError.badRequest(400, "Errors with validating data from body", errors.array()));
            }

            const { title, price, categories, description } = req.body;
            const { userId } = req.headers;

            const product = await ProductService.createProduct(title, String(price), description, userId, categories);

            return res.status(200).json({product});
        } catch(err) {
            next(err);
        }
    }

    async deleteProduct(req: IRequest<IProduct, ICustomHeaders>, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw next(ApiError.badRequest(400, "Errors with validating data from body", errors.array()));
            }

            const { productId } = req.params;
            const { userId } = req.headers;

            const result = await ProductService.deleteProduct(productId, userId);

            return res.status(200).json({message: result});
        } catch(err) {
            next(err);
        }
    }

    async modifyProduct(req: IRequest<ISpot, ICustomHeaders>, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                throw next(ApiError.badRequest(400, "Errors with validating data from body", errors.array()));
            }

            const { title, description, categories, price } = req.body;
            const { productId } = req.params;
            const { userId } = req.headers;

            const modifiedProduct = await ProductService.modifyProduct(productId, userId, title, categories, description, String(price));

            return res.status(200).json({modifiedProduct});
        } catch(err) {
            next(err);
        }
    }
}

export const productController = new ProductController();