import { Router } from 'express';
import { check } from 'express-validator';
import { Permission } from '../models/permissions';
import { safeRoute,safeTokenizedRoute } from './safe.route';
import { UserController } from './Controllers/user.controller';

const router: Router = Router();
const userController = new UserController();
router.post(
  '/create',
  [
    check('name', 'Field required').exists().isString(),
    check('password', 'Field required').exists().isString(),
    check('key', 'Field required').exists().isNumeric(),
    check('phone', 'Field required').exists().isNumeric(),
  ],
  safeRoute(userController.create)
);

router.put(
  '/',
  [
    check('name','Field required').exists(),
  ],
  safeTokenizedRoute(userController.updateName,[Permission.PaymentStatusChange])
);

//Login
router.post(
  '/login',
  [
    check('password', 'Field required').exists(),
    check('key', 'Field required').exists(),
    check('phone', 'Field required').exists(),
  ],
  safeRoute(userController.login)
);

export default router;
