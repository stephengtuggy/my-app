import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location, UpperCasePipe} from '@angular/common';

import {Animal} from '../animal.model';
import {AnimalService} from '../animal.service';
import {FormsModule} from '@angular/forms';
import {form, FormField} from "@angular/forms/signals";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-animal-detail',
    templateUrl: './animal-detail.component.html',
    styleUrls: ['./animal-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, UpperCasePipe, FormField]
})
export class AnimalDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private animalService = inject(AnimalService);
    private location = inject(Location);

    animalModel = signal<Animal>({
        animalName: '',
        id: -1,
    });

    animalForm = form(this.animalModel);

    constructor() {
    }

    ngOnInit(): void {
        this.getAnimal();
    }

    getAnimal(): void {
        const id: number = +(this.route?.snapshot?.paramMap?.get('id') ?? 0);
        this.animalService.getAnimal(id)
            .subscribe(animal => {
                this.animalForm.animalName().value.set(animal.animalName);
                this.animalForm.id().value.set(animal.id);
            });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.animalService.updateAnimal({ animalName: this.animalForm.animalName().value(), id: this.animalForm.id().value()})
            .pipe(
                tap({
                    next: () => this.goBack(),
                }),
            );
    }

}
