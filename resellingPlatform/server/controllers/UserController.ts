import { Request, Response, NextFunction } from 'express'; 
import { IRequest, IProduct, ICustomHeaders } from '../interfaces/RequestInterfaces';
import { validationResult } from 'express-validator';
import { UserService } from '../services/UserService';
import { ApiError } from '../exceptions/ErrorHandler';

class UserController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw next(ApiError.badRequest(400, "Errors with validating data from body", errors.array()));
            }
            
            const { email, username, phone, password, repeatedPass } = req.body;

            const user = await UserService.registration(email, password, repeatedPass, username, phone);

            return res.status(200).json({user});
        } catch(err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw next(ApiError.badRequest(400, "Errors with validating data from body", errors.array()));
            }

            const { email, password } = req.body;

            const tokens = await UserService.login(email, password);
            
            res.cookie("refreshToken", tokens.refreshToken, {
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)), 
                httpOnly: true, 
                sameSite: 'lax',
            });

            return res.status(200).json({tokens});
        } catch(err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const { refreshToken } = req.cookies;
            const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";

            const tokens = await UserService.refresh(refreshToken, JWT_REFRESH_KEY);

            return res.status(200).json({tokens});
        } catch(err) {
            next(err)
        }   
    }

    async addToFavorites(req: IRequest<IProduct, ICustomHeaders>, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw next(ApiError.badRequest(400, "Errors with validating data from body", errors.array()));
            }

            const { productId } = req.body;
            const { userId } = req.headers;

            const user = await UserService.addToFavorites(productId, userId);

            return res.status(200).json({user});
        } catch(err) {
            next(err);
        }
    }
}

export const userController = new UserController();