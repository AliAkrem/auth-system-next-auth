
import * as Yup from 'yup'

export class RegisterRequest extends Request {
  constructor(input: RequestInfo, init?: RequestInit) {
    super(input, init);
  }
  
  authorize() {
    return true;
  }

  rules()  {
    return (Yup.object().shape({
      userName: Yup.string()
        .required()
        .max(255, 'email must be at most 255 characters'),
      email: Yup.string()
        .email('invalid email format')
        .required('email is required')
        .max(255, 'email must be at most 255 characters'),

      password: Yup.string().required('password is required')
        .min(8, 'password at least contain 8 character')
        .max(255, 'password must be at most 255 characters')
        .uppercase('must contain at least one uppercase')
      ,
    }))
  }

}