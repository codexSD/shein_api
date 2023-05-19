import { Router } from 'express';
import { check } from 'express-validator';
import { Permission } from '../../models/permissions';
import { safeRoute, safeTokenizedRoute } from '../safe.route';
import { UserRoleController } from '../Controllers/userRole.controller';

const userRoleRouter: Router = Router();

userRoleRouter.get(
    '/get',
    [
      check('userId','Field required').exists().isNumeric(),
    ],
    safeTokenizedRoute(UserRoleController.Get,[Permission.GetUserRole])
  );

  userRoleRouter.post(
    '/add',
    [
        check('userId','Field required').exists().isNumeric(),
        check('roleId','Field required').exists().isNumeric(),
    ],
    safeTokenizedRoute(UserRoleController.Add,[Permission.AddUserRole])
  );

  userRoleRouter.post(
    '/remove',
    [
        check('userId','Field required').exists().isNumeric(),
        check('roleId','Field required').exists().isNumeric(),
    ],
    safeTokenizedRoute(UserRoleController.Remove,[Permission.RemoveUserRole])
  );

export default userRoleRouter;