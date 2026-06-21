import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, UpperCasePipe } from '@angular/common';

import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-animal-detail',
    templateUrl: './animal-detail.component.html',
    styleUrls: ['./animal-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, UpperCasePipe]
})
export class AnimalDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private animalService = inject(AnimalService);
  private location = inject(Location);

  animal: Animal | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
    this.getAnimal();
  }

  getAnimal(): void {
    const id: number = +(this.route?.snapshot?.paramMap?.get('id') ?? 0);
    this.animalService.getAnimal(id)
      .subscribe(animal => this.animal = animal);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.animalService.updateAnimal((this.animal as Animal))
      .subscribe(() => this.goBack());
  }

}
