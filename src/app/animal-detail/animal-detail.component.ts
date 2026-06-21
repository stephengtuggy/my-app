import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';

@Component({
    selector: 'app-animal-detail',
    templateUrl: './animal-detail.component.html',
    styleUrls: ['./animal-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private location: Location
  ) { }

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
