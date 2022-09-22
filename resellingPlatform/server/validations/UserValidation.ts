import { body } from 'express-validator';

export const register = [
    body("username", "Username is too short, must be at least 3 characters").isLength({min: 3}),
    body("password", "Password is too short must be at least 5 characters").isLength({min:5}),
    body("repeatedPass", "Repeated Password is too short must be at least 5 characters").isLength({min:5}),
    body("email", "Not a valid email").isEmail(),
    body("phone", "Must be a valid phone number").isLength({min:7})
]

export const login = [
    body("email", "Invalid email").isEmail(),
    body("password", "Password is too short").isLength({min:5})
]

export const addToFavorites = [
    body("productId", "Invalid productId").isLength({min:10})
]