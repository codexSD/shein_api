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
export class AuthorizationError extends CustomError{
    constructor(){super("Authorization Error");}
}