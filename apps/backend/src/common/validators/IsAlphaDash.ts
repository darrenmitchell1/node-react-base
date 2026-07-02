import { isAlphanumeric, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsAlphaDash', async: false })
export class IsAlphaDash implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isAlphanumeric(text.replace(/[-_]/g, ''));  // remove the - and _ then check if only alpha or numbers exist

  }

  defaultMessage(args: ValidationArguments) {
    // default error message if validation failed
    return '$property ($value) is not in alpha dash format!';
  }
}