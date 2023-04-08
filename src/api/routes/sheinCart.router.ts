import { Router } from 'express';
import { check } from 'express-validator';
import { Permission } from '../../models/permissions';
import { safeRoute, safeTokenizedRoute } from '../safe.route';
import { SheinCartController } from '../sheinCart.controller';

const sheinCartRouter: Router = Router();
sheinCartRouter.post(
  '/create',
  [
    check('data', 'Field required').exists().isJSON(),
  ],
  safeTokenizedRoute(SheinCartController.createCart)
);

export default sheinCartRouter;