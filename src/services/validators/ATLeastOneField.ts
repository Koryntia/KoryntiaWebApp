import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function AtLeastOneField(property: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'AtLeastOneField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedProperties = args.constraints[0];
          const object = args.object as any;
          return relatedProperties.some((key: string) => object[key] !== undefined && object[key] !== null);
        },
        defaultMessage(args: ValidationArguments) {
          return 'At least one field other than loanToken must be provided';
        },
      },
    });
  };
}
