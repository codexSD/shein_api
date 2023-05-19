import { Router } from 'express';
import { check } from 'express-validator';
import { Permission } from '../../models/permissions';
import { RoleController } from '../Controllers/role.controller';
import { safeRoute, safeTokenizedRoute } from '../safe.route';

const roleRouter: Router = Router();

roleRouter.get(
    '/getAll',
    safeTokenizedRoute(RoleController.getAll,[Permission.GetRoleDetails])
  );

  roleRouter.get(
    '/get',
    [
      check('id','Field required').exists().isNumeric(),
    ],
    safeTokenizedRoute(RoleController.get,[Permission.GetRoleDetails])
  );

  roleRouter.post(
    '/create',
    [
      check('name','Field required').exists().isString(),
      check('permissions','Field required').exists().isJSON(),
    ],
    safeTokenizedRoute(RoleController.create,[Permission.CreateRole])
  );

  roleRouter.post(
    '/update',
    [
      check('name','Field required').exists().isString(),
      check('id','Field required').exists().isNumeric(),
      check('permissions','Field required').exists().isJSON(),
    ],
    safeTokenizedRoute(RoleController.update,[Permission.UpdateRole])
  );

  roleRouter.post(
    '/remove',
    [
      check('id','Field required').exists().isNumeric(),
    ],
    safeTokenizedRoute(RoleController.remove,[Permission.RemoveRole])
  );
export default roleRouter;