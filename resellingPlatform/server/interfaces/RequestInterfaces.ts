import { Request} from 'express';
import { IncomingHttpHeaders } from 'http';

export interface ICustomHeaders {
    userId?: string;
}

export interface ISpot {
    title: string,
    price: number,
    description: string,
    categories: Array<string>,
    productId?: string 
}

export interface IRequest<TBody, THeader> extends Request {
    headers: IncomingHttpHeaders & THeader,
    body: TBody
}

export interface IProduct {
    productId: string
}
