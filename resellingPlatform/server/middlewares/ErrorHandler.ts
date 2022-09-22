import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/ErrorHandler';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response | ApiError => {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.errStatus).json({message: err.message, errors: err.errors});
    }

    return res.status(500).json({error: err});
}
