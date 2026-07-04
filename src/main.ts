import { enableProdMode, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient, withXhr, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryOverrideAnimalDataService } from './app/in-memory-override-animal-data.service';
import { AnimalService } from './app/animal.service';
import { FoodService } from './app/food.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing/app-routing.module';
import { CoreModule } from './app/core/core.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, AppRoutingModule, CoreModule),
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryOverrideAnimalDataService, { delay: 600 })),
        AnimalService,
        FoodService
    ]
});
