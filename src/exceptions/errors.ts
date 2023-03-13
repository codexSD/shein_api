export class PhoneNumberNotCorrect extends Error{
    constructor() {
        super("Phone number is not correct");
    }
}
export class PasswordNotValid extends Error{
    constructor() {
        super("Password is not valid");
    }
}
export class PhoneNumberIsNotUnique extends Error{
    constructor(){super("Phone number is not unique");}
}