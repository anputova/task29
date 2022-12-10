import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {RegistrationRoutingModule} from "./registration-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {MatIconModule} from "@angular/material/icon";
import {RegistrationDataService} from "./registration-data.service";
import {RegistrationService} from "./registration.service";


@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,

    RegistrationRoutingModule
  ],
  providers: [
    RegistrationDataService,
    RegistrationService
  ]
})
export class RegistrationModule {
}
