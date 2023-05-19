import { Router } from "express";
import { safeTokenizedRoute } from "../safe.route";
import { ProductController } from "../Controllers/product.controller";
import { Permission } from "../../models/permissions";
import { check } from "express-validator";

const productRouter: Router = Router();

productRouter.get(
    '/getAll',
    safeTokenizedRoute(ProductController.ReadAll,[Permission.ReadProducts])
  );

  productRouter.get(
    '/get',
    [
      check('productId','Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.Read,[Permission.ReadProducts])
  );

  productRouter.post(
    '/create',
    [
      check('name','Field required').exists().isString(),
      check('description','Field required').exists().isString(),
      check('imageUrl','Field required').exists().isString(),
      check('price','Field required').exists().isNumeric(),
      check('storeId','Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.Create,[Permission.ReadProducts])
  );