import { Router } from "express";
import { safeTokenizedRoute } from "../safe.route";
import { ProductController } from "../Controllers/product.controller";
import { Permission } from "../../models/permissions";
import { check } from "express-validator";

const productRouter: Router = Router();

productRouter.get(
    '/getAll',
    safeTokenizedRoute(ProductController.ReadAll,[Permission.ReadProduct])
  );
  productRouter.get(
    '/getByStore',
    [
      check('storeId','Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.ReadByStore, [Permission.ReadProduct])
  );
 

  productRouter.get(
    '/get',
    [
      check('productId','Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.Read,[Permission.ReadProduct])
  );

  productRouter.post(
    '/create',
    [
      check('name','Field required').exists().isString(),
      check('description','Field required').exists().isString(),
      check('imageUrl','Field required').exists().isString(),
      check('price','Field required').exists().isFloat(),
      check('storeId','Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.Create,[Permission.CreateProduct])
  );

  productRouter.post(
    '/update',
    [
      check('productId', 'Field required').exists().isUUID(),
      check('name', 'Field required').exists().isString(),
      check('description', 'Field required').exists().isString(),
      check('imageUrl', 'Field required').exists().isString(),
      check('price', 'Field required').exists().isFloat(),
      check('storeId', 'Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.Update, [Permission.UpdateProduct])
  );
  
  productRouter.post(
    '/delete',
    [
      check('productId', 'Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.Delete, [Permission.DeleteProduct])
  );
  
  productRouter.post(
    '/deleteByStore',
    [
      check('storeId', 'Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(ProductController.DeleteByStore, [Permission.DeleteProduct])
  );

  export default productRouter;