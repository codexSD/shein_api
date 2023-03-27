import { Router } from 'express';
import { check } from 'express-validator';
import { safeRoute } from './safe.route';
import { UserController } from './user.controller';

const router: Router = Router();
const userController = new UserController();
router.post(
  '/',
  [
    check('name', 'Field required').exists(),
    check('password', 'Field required').exists(),
    check('key', 'Field required').exists(),
    check('phone', 'Field required').exists(),
  ],
  safeRoute(userController.create)
);

router.put(
  '/',
  [
    check('name','Field required').exists(),
  ],
  safeRoute(userController.updateName)
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

router.post('/test',[
  check('tk', 'Field required').exists(),
],safeRoute(userController.test))

export default router;
