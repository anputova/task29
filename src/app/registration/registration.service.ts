import {Injectable} from "@angular/core";
import {RegistrationDataService} from "./registration-data.service";
import {RegistrationRequest} from "./registration-request";
import {RegistrationField} from "./registration-field";
import {Observable, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppRoutesNames} from "../app-routes-names.enum";
import {FieldValidation} from "./field-validation";
import {ControlValidator, ValidatorType} from "./registration-form/registration-form.component";

@Injectable()
export class RegistrationService {
  constructor(private fb: FormBuilder, private readonly dataService: RegistrationDataService, private router: Router) {
  }

  public initForm(controls: RegistrationField[]): FormGroup {
    const form = this.fb.group(
      controls.reduce((acc: any, c) => {
        const validators = c.validations ? c.validations.map(v => this.buildValidator(v).validatorFn) : [];

        acc[c.name] = ['', validators];

        return acc;
      }, {})
    );
    return form;
  }

  public register(data: RegistrationRequest): Observable<RegistrationRequest> {
    return this.dataService.register(data).pipe(tap(() => this.router.navigate([AppRoutesNames.Welcome])));
  }

  public getRegistrationFields(): Observable<RegistrationField[]> {
    return this.dataService.getRegistrationFields();
  }

  public buildValidator(validatorConfig: FieldValidation): ControlValidator {
    switch (validatorConfig.name) {
      case ValidatorType.pattern:
        return {
          validatorFn: Validators.pattern(validatorConfig.value as string),
          name: validatorConfig.name,
          errorText: validatorConfig.message
        };
      case ValidatorType.maxLength:
        return {
          validatorFn: Validators.maxLength(Number(validatorConfig.value)),
          name: validatorConfig.name,
          errorText: validatorConfig.message
        };
      case ValidatorType.minLength:

        return {
          validatorFn: Validators.minLength(Number(validatorConfig.value)),
          name: validatorConfig.name,
          errorText: validatorConfig.message
        };
      default:
        throw new Error("[Validator from feature2]: Unknown type");
    }
  }
}
