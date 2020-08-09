import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { AnimalDetailComponent } from '../animal-detail/animal-detail.component';
import { AnimalListComponent } from '../animal-list/animal-list.component';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { FoodListComponent } from '../food-list/food-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'animals/:id', component: AnimalDetailComponent },
  { path: 'animals', component: AnimalListComponent },
  { path: 'foods/:id', component: FoodDetailComponent },
  { path: 'foods', component: FoodListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
