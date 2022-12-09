import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {NotFoundPageComponent} from "../shared/not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
