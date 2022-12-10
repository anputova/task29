import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {RegistrationField} from "./registration/registration-field";
import {RegistrationRequest} from "./registration/registration-request";

const FIELDS_STORAGE_ITEM_NAME = 'fields';
const USE_MOCKS = 'useMocks';


export class RegistrationHttpInterceptor implements HttpInterceptor {
  private registrationFormFieldsResponseExample: RegistrationField[] = [
    {
      type: 'text',
      name: 'first_name',
      label: 'First Name',
      required: true,
      validations: [
        {
          name: 'regex',
          message: 'Only English characters are allowed.',
          value: '^[a-zA-Z0-9]*$',
        },
        {
          name: 'maxlength',
          message: 'Must be less than 64 characters.',
          value: 63,
        },
      ],
    },
    {
      type: 'text',
      name: 'middle_name',
      label: 'Middle Name',
      required: false,
      validations: [
        {
          name: 'regex',
          message: 'Only English characters are allowed.',
          value: '^[a-zA-Z0-9]*$',
        },
        {
          name: 'maxlength',
          message: 'Must be less than 64 characters.',
          value: 63,
        },
      ],
    },
    {
      type: 'text',
      name: 'last_name',
      label: 'Last Name',
      required: true,
      validations: [
        {
          name: 'regex',
          message: 'Only English characters are allowed.',
          value: '^[a-zA-Z0-9]*$',
        },
        {
          name: 'maxlength',
          message: 'Must be less than 64 characters.',
          value: 63,
        },
      ],
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      required: true,
      validations: [
        {
          name: 'regex',
          message: 'Only English characters are allowed.',
          value: '^[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,}$',
        },
        {
          name: 'maxlength',
          message: 'Must be less than 47 characters.',
          value: 46,
        },
      ],
    },
    {
      type: 'phone',
      name: 'phone_number',
      label: 'Mobile number',
      required: true,
      validations: [
        {
          name: 'regex',
          message: 'Only numbers are allowed.',
          value: '^[0-9]+$',
        },
        {
          name: 'maxlength',
          message: 'Must be less than 47 characters.',
          value: 10,
        },
        {
          name: 'minlength',
          message: 'Must not be less than 4 characters.',
          value: 4,
        },
      ],
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      required: true,
      validations: [
        {
          name: 'maxlength',
          message: 'Must be less than 15 characters.',
          value: 15,
        },
        {
          name: 'minlength',
          message: 'Must not be less than 8 characters.',
          value: 8,
        },
        {
          name: 'regex',
          message: '1 or more numbers.',
          value: '^.*[0-9].*$',
        },
        {
          name: 'regex',
          message: '1 or more lower case letters.',
          value: '^.*[a-z].*$',
        },
        {
          name: 'regex',
          message: '1 or more upper case letters.',
          value: '^.*[A-Z].*$',
        },
      ],
    },
  ];

  private registrationFormFieldsResponseExample2: RegistrationField[] = [
    {
      type: 'text',
      name: 'first_name',
      label: 'First Name',
      required: true,
      validations: [
        {
          name: 'regex',
          message: 'Only English characters are allowed.',
          value: '^[a-zA-Z0-9]*$',
        },
        {
          name: 'maxlength',
          message: 'Must be less than 64 characters.',
          value: 63,
        },
      ],
    },
    {
      type: 'text',
      name: 'middle_name',
      label: 'Middle Name',
      required: false,
      validations: [
        {
          name: 'regex',
          message: 'Only English characters are allowed.',
          value: '^[a-zA-Z0-9]*$',
        },
        {
          name: 'maxlength',
          message: 'Must be less than 64 characters.',
          value: 63,
        },
      ],
    },
  ];

  private registrationRequestExample: RegistrationRequest = {
    first_name: 'John',
    middle_name: '',
    last_name: 'Doe',
    email: 'john@test.com',
    phone_number: '12345678',
    password: 'SecretPassword',
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const useMocks = localStorage.getItem(USE_MOCKS)
      ? JSON.parse(localStorage.getItem(USE_MOCKS) as string)
      : true;
    if (!useMocks) {
      return next.handle(request);
    }

    if (request.url.includes('/fields')) {

      const fieldsResponse = localStorage.getItem(FIELDS_STORAGE_ITEM_NAME)
        ? JSON.parse(localStorage.getItem(FIELDS_STORAGE_ITEM_NAME) as string)
        : this.registrationFormFieldsResponseExample2;

      return of(new HttpResponse(
        {status: 200, body: fieldsResponse}
      ));
    }

    if (request.url.includes('/register')) {
      console.log(request.body);
      return of(new HttpResponse(
        {status: 200, body: request.body}
      ));
    }

    return next.handle(request);
  }
}
