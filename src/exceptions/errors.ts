export class CustomError extends Error{
    code:number = 422;
}
export class PhoneNumberNotCorrect extends CustomError{
    constructor() {super("Phone number is not correct");}
}
export class PasswordNotValid extends CustomError{
    constructor() {super("Password is not valid");}
}
export class PhoneNumberIsNotUnique extends CustomError{
    constructor(){super("Phone number is not unique");}
}
export class LoginNotValid extends CustomError{
    constructor(){super("Failed to login");}
}
export class UserNotFound extends CustomError{
    constructor(){super("User Not Founded");}
}
export class AuthorizationError extends CustomError{
    constructor(){super("Authorization Error");}
}
export class CartNotFounded extends CustomError{
    constructor(){super("Cart Not Founded");}
}
export class RoleNotFound extends CustomError{
    constructor(){super("Role Not Founded");}
}
export class UserAlreadyHasThisRole extends CustomError{
    constructor(){super("User Already Has This Role");}
}
export class RoleMustHavePermissions extends CustomError{
    constructor(){super("Role Must Have Permissions");}
}
export class UnknownPermission extends CustomError{
    constructor(){super("Unknown Permission");}
}
export class OperationFailed extends CustomError{
    constructor(){super("Operation Failed");}
}
export class StoreNotFound extends CustomError{
    constructor(){super("Store Not Found");}
}
export class ProductNotFound extends CustomError{
    constructor(){super("Product Not Found");}
}

