import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { productController } from '../controllers/ProductController';
import * as userValidation from '../validations/UserValidation';
import * as productValidation from '../validations/ProductValidation';
import { checkAuth } from '../middlewares/CheckAuth';
const router = Router();

//user
router.post("/registration", userValidation.register, userController.registration);
router.post("/login", userValidation.login, userController.login);
router.get("/refresh", userController.refresh);

//product
router.post("/createProduct", checkAuth, productValidation.create, productController.createProduct);
router.delete("/deleteProduct/:productId", checkAuth, productController.deleteProduct);
router.patch("/modifyProduct/:productId", checkAuth, productValidation.modify, productController.modifyProduct);
router.post("/addToFavorites", checkAuth, userValidation.addToFavorites, userController.addToFavorites);

export default router;