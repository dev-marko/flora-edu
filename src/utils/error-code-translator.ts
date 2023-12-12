import { ErrorCodes } from '@enums/error-codes';

const errorCodeMessages = new Map<ErrorCodes, string>([
  [ErrorCodes.NotFound, 'Бараниот ресурс не е пронајден.'],
  [ErrorCodes.BadRequest, 'Настаната е клиентска грешка, обидете се повторно.'],
  [
    ErrorCodes.InternalServerError,
    'Настаната е серверска грешка, обидете се повторно',
  ],
  [ErrorCodes.OperationFailed, 'Неуспешна операција.'],
  [ErrorCodes.UserNonExistant, 'Корисникот не е пронајден.'],
  [ErrorCodes.UserExists, 'Корисникот веќе постои.'],
  [ErrorCodes.PasswordMismatch, 'Погрешна лозинка.'],
]);

export default errorCodeMessages;
