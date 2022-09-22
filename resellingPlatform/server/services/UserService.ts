import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { TokenService } from '../services/TokenServices';
import { ApiError } from '../exceptions/ErrorHandler';
import { ITokens } from '../interfaces/TokenInterfaces';
import UserModel from '../models/UserModel';
import ProductModel from '../models/ProductModel';
 
export class UserService {
    static async registration(email: string, password: string, repeatedPass: string, username: string, phone: string): Promise<Object> {
        try {
            const candidate = await UserModel.findOne({email});

            if (candidate) {
                throw ApiError.badRequest(400, "An acount with this email has already been registered");
            }

            if (password !== repeatedPass) {
                throw ApiError.badRequest(400, "passwords do not match");
            }     

            const hashedPass = await bcrypt.hash(password, 3);

            const user = await UserModel.create({
                email,
                username,
                phone,
                password: hashedPass,
            });

            if (!user) {
                throw ApiError.badRequest(500, "Error while registering this user")
            }

            return user;
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }
    }

    static async login(email: string, password: string): Promise<ITokens> {
        try {
            const candidate = await UserModel.findOne({email});

        if (!candidate) {
            throw ApiError.badRequest(400, "email or password is incorrect");
        }

        const passwordMatches = await bcrypt.compare(password, candidate.password);
        
        if (!passwordMatches) {
            throw ApiError.badRequest(400, "email or password is incorrect");
        }

        const tokens = await TokenService.generateTokens({userId: candidate._id});

        return { ...tokens } as ITokens;
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }  
    }

    static async refresh(refreshToken: string, key: string): Promise<ITokens> {
        try {
            const token = await TokenService.validateToken(refreshToken, key);

        const user = await UserModel.findOne({_id: token.userId});

        if (!user) {
            throw ApiError.badRequest(400, "User not found");
        }

        const tokens = await TokenService.generateTokens({userId: user._id});

        return { ... tokens } as ITokens
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }
    }

    static async addToFavorites(productId: string, ownerId: string = "No ID"): Promise<Object> {
        try {
            const owner = await UserModel.findOne({_id: ownerId});
        
            if (!owner) {
                throw ApiError.badRequest(400, "User not found");
            }

            const product = await ProductModel.findOne({_id: productId});

            if (!product) {
                throw ApiError.badRequest(400, "This item does not exist");
            }
    
            let favoritesProducts: Array<string> = owner.favorites;
            
            if (favoritesProducts.includes(productId)) {
                throw ApiError.badRequest(400, "Item is already in favorite list");
            }

            favoritesProducts.push(productId);
            owner.favorites = favoritesProducts;

            await owner.save();

            return owner;
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }
        
    }

    static async removeFavorites(productId: string, ownerId: string = "No ID"): Promise<Object> {
        try {
            const owner = await UserModel.findOne({_id: ownerId});

            if (!owner) {
                throw ApiError.badRequest(400, "User not found");
            }

            let favorites: Array<String> = owner.favorites;
            //// remove from array add the array to owner.favorites and do owner.save() also verify somehow
            //// if the productId is in array before removing it.
            return owner;
        } catch(err) {
            throw ApiError.badRequest(400, `${err}`);
        }
    }
}
