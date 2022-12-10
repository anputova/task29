import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn} from "@angular/forms";
import {RegistrationService} from "../registration.service";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {RegistrationField} from "../registration-field";

export enum FormControlType {
  text = 'text',
  email = 'email',
  phone = 'phone',
  password = 'password'
}

export enum ValidatorType {
  maxLength = 'maxlength',
  pattern = 'regex',
  minLength = 'minlength'
}

export interface BaseControl {
  name: string;
  type: FormControlType;
  label?: string;
  validators?: ControlValidator[];
  required: boolean
}

export interface ControlValidator {
  validatorFn: ValidatorFn;
  name: string;
  errorText?: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  userForm!: FormGroup;
  controls: RegistrationField[] = [];
  hide: boolean = true; //todo create controls
  initialized: boolean = false;
  serverError?: Error;
  readonly formControlType = FormControlType;
  protected ngUnsubscribe$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private service: RegistrationService) {
  }

  ngOnInit(): void {
    this.service.getRegistrationFields()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(fields => {
        this.controls = fields;
        this.userForm = this.service.initForm(fields);
        this.initialized = true;
      });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onSave(): void {
    if (!this.userForm || this.userForm.invalid) {
      return;
    }
    const user = this.userForm.getRawValue();
    this.service.register(user)
      .pipe(takeUntil(this.ngUnsubscribe$),
        catchError(err => {
          this.serverError = err.message;
          return of(null);
        }))
      .subscribe();
  }
}
