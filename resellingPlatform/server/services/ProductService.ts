import ProductModel from '../models/ProductModel';
import { ApiError } from '../exceptions/ErrorHandler';

export class ProductService {
    static async createProduct(title: string, price: string, description: string, ownerId: string = "No ID", categories: Array<string>): Promise<Object> {
        try {
            const candidateProduct = await ProductModel.findOne({owner: ownerId, title});

            if (candidateProduct) {
                throw ApiError.badRequest(400, "This product already exists");
            }

            const product = await ProductModel.create({
                title,
                price,
                description,
                owner: ownerId,
                categories,
            });

            return product;
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }
    }

    static async deleteProduct(productId: string, ownerId: string = "No ID"): Promise<string> {
        try {
            const product = await ProductModel.findOneAndDelete({_id: productId, owner: ownerId});

            if (product === null) {
                throw ApiError.badRequest(400, "Item has not been deleted");
            }

            return "Product was removed";
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }
    }

    static async modifyProduct(productId: string = "No productID", ownerId: string = "No ID", title: string, categories: Array<string>, description: string, price: string): Promise<Object> {
        try {
            const modifiedProduct = await ProductModel.findOneAndUpdate({_id: productId, owner: ownerId}, {
                title,
                categories,
                description,
                price
            }, {new:true});
    
            if (!modifiedProduct) {
                throw ApiError.badRequest(400, "Unable to update this item, invalid item Id or an unauthorized user is trying to delete it");
            }
    
            return modifiedProduct;
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }
        
    }
}
