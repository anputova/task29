import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppRoutesNames} from "./app-routes-names.enum";
import {DashboardPageComponent} from "./dashboard/dashboard-page/dashboard-page.component";


export const routes: Routes = [
  {path: AppRoutesNames.Dashboard, component: DashboardPageComponent},
  {
    path: AppRoutesNames.Registration,
    loadChildren: () => import('src/app/registration/registration.module').then(m => m.RegistrationModule),
  },
  {
    path: AppRoutesNames.Welcome,
    loadChildren: () => import('src/app/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {path: '**', redirectTo: AppRoutesNames.Dashboard, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
