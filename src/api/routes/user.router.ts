import { Router } from 'express';
import { check } from 'express-validator';
import { Permission } from '../../models/permissions';
import { safeRoute, safeTokenizedRoute } from '../safe.route';
import { UserController } from '../Controllers/user.controller';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get(
  '/get',
  [
    check('id', 'Field required').exists().isNumeric(),
  ],
  safeTokenizedRoute(userController.get,[Permission.GetUser])
);
userRouter.post(
  '/create',
  [
    check('name', 'Field required').exists().isString(),
    check('password', 'Field required').exists().isString(),
    check('key', 'Field required').exists().isNumeric(),
    check('phone', 'Field required').exists().isNumeric(),
  ],
  safeTokenizedRoute(userController.create,[Permission.CreateUser])
);

userRouter.post(
  '/update',
  [
    check('uid','Field required').exists().isNumeric(),
    check('name','Field required').exists().isString(),
  ],
  safeTokenizedRoute(userController.updateName,[Permission.UpdateUser])
);

//Login
userRouter.post(
  '/login',
  [
    check('password', 'Field required').exists(),
    check('key', 'Field required').exists(),
    check('phone', 'Field required').exists(),
  ],
  safeRoute(userController.login)
);

export default userRouter;
