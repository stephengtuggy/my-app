import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('../dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'animals/:id', loadComponent: () => import('../animal-detail/animal-detail.component').then(m => m.AnimalDetailComponent) },
  { path: 'animals', loadComponent: () => import('../animal-list/animal-list.component').then(m => m.AnimalListComponent) },
  { path: 'foods/:id', loadComponent: () => import('../food-detail/food-detail.component').then(m => m.FoodDetailComponent) },
  { path: 'foods', loadComponent: () => import('../food-list/food-list.component').then(m => m.FoodListComponent) }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {})
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
