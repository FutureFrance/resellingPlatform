import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ITokenPayload, ITokens } from '../interfaces/TokenInterfaces';
import { ApiError } from '../exceptions/ErrorHandler';

dotenv.config();

export class TokenService {
    static async generateTokens(payload: ITokenPayload): Promise<ITokens> {
        const ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
        const REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";

        const accessToken = jwt.sign(payload, ACCESS_KEY, {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, REFRESH_KEY, {expiresIn: "1w"});

        return { refreshToken, accessToken }
    }

    static async validateToken(token: string, key: string): Promise<ITokenPayload> {
        try {
            const valid = jwt.verify(token, key);

            return valid as ITokenPayload;
        } catch(err) {
            throw ApiError.unauthorized();
        }
    }
}