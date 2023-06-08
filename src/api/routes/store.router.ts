import { Router } from "express";
import { safeTokenizedRoute } from "../safe.route";
import { Permission } from "../../models/permissions";
import { check } from "express-validator";
import { StoreController } from "../Controllers/store.controller";

const storeRouter: Router = Router();

storeRouter.get(
    '/getAll',
    safeTokenizedRoute(StoreController.GetAll,[Permission.ReadStore])
  );

storeRouter.get(
    '/get',
    [
      check('storeId','Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(StoreController.Get,[Permission.ReadStore])
  );

  storeRouter.post(
    '/create',
    [
      check('name','Field required').exists().isString(),
      check('description','Field required').exists().isString(),
      check('imageUrl','Field required').exists().isString(),
    ],
    safeTokenizedRoute(StoreController.Create,[Permission.CreateStore])
  );

  storeRouter.post(
    '/update',
    [
      check('storeId', 'Field required').exists().isUUID(),
      check('name', 'Field required').exists().isString(),
      check('description', 'Field required').exists().isString(),
      check('imageUrl', 'Field required').exists().isString(),
    ],
    safeTokenizedRoute(StoreController.Update, [Permission.UpdateStore])
  );
  
  storeRouter.post(
    '/delete',
    [
      check('storeId', 'Field required').exists().isUUID(),
    ],
    safeTokenizedRoute(StoreController.Delete, [Permission.DeleteStore])
  );

  export default storeRouter;
  