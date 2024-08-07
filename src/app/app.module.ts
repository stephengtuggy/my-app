import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalSearchComponent } from './animal-search/animal-search.component';
import { AnimalService } from './animal.service';
import { InMemoryDataService } from './in-memory-data.service';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodSearchComponent } from './food-search/food-search.component';
import { FoodService } from './food.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 })),
      AnimalService,
      FoodService
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AnimalDetailComponent,
        AnimalListComponent,
        AnimalSearchComponent,
        FoodDetailComponent,
        FoodListComponent,
        FoodSearchComponent,
        MessagesComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        FormsModule,
        AppRoutingModule,
        CoreModule
    ]})
export class AppModule { }
