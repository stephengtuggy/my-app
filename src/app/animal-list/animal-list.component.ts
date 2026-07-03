import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';

import {Animal} from '../animal.model';
import {AnimalService} from '../animal.service';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class AnimalListComponent implements OnInit {
    private animalService = inject(AnimalService);

    animals: Animal[] = new Array<Animal>();

    constructor() {
    }

    ngOnInit(): void {
        this.getAnimals();
    }

    getAnimals(): void {
        this.animalService.getAnimals()
            .subscribe((animals: Animal[]) => this.animals = animals);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.animalService.addAnimal({name} as Animal)
            .subscribe((animal: Animal) => {
                this.animals.push(animal);
            });
    }

    delete(animal: Animal): void {
        this.animals = this.animals.filter(a => a !== animal);
        this.animalService.deleteAnimal(animal).subscribe(() => this.getAnimals());
    }
}
