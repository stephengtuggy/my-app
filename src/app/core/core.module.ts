import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from '../module-import-guard';
import { FoodService } from '../food.service';
import { AnimalService } from '../animal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ FoodService, AnimalService ]
})
export class CoreModule {

  constructor() {
    const parentModule = inject(CoreModule, { optional: true, skipSelf: true })!;

    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
