import { ObjectId } from 'mongodb';

export interface ITokenPayload {
    userId: ObjectId;
}

export interface ITokens {
    accessToken: string,
    refreshToken: string
}