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

export default router;
