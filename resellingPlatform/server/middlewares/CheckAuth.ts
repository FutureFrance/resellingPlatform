import { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ApiError } from '../exceptions/ErrorHandler';
import { TokenService } from '../services/TokenServices';

dotenv.config();

export const checkAuth = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const authorizationToken = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if(!authorizationToken) {
            throw ApiError.unauthorized();
        }

        const JWT_ACCESS_KEY: string = process.env.JWT_ACCESS_KEY || ""

        const accessToken = await TokenService.validateToken(authorizationToken, JWT_ACCESS_KEY);

        req.headers.userId = String(accessToken.userId) || "no ID";
        next();
    } catch(err) {
        next(ApiError.unauthorized());
    }
}