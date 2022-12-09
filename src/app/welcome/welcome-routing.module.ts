import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {NotFoundPageComponent} from "../shared/not-found-page/not-found-page.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
