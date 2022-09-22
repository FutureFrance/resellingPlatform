import { body } from 'express-validator';

export const create = [
    body("title", "Title is too short").isLength({min:3}),
    body("description", "Description is too short").isLength({min:10}),
    body("price", "Price must be a number").isNumeric().isLength({max:7, min:1}),
    body("categories", "categories must be an array of strings").isArray()
]

export const modify = [
    body("price", "Price must be a number").isNumeric().isLength({max:7, min:1}),
    body("title", "Title is too short").isLength({min:3}),
    body("description", "Description is too short").isLength({min:10}),
    body("categories", "categories must be an array of strings").isArray(),
    body("productId", "Invalid product ID").isLength({min:10}),
]