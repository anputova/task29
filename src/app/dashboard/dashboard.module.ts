import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ]
})
export class DashboardModule {
}
