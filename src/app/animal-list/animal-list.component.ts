import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {Animal} from '../animal.model';
import {AnimalService} from '../animal.service';
import {RouterLink} from '@angular/router';
import {rxResource} from "@angular/core/rxjs-interop";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class AnimalListComponent {
    private animalService: AnimalService = inject(AnimalService);

    protected animalsResource = rxResource({
        params: () => ({}),

        stream: ({params}) => this.animalService.getAnimals(),
    });

    constructor() {
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.animalService.addAnimal({animalName: name} as Animal)
            .pipe(
                tap({
                    next: () => this.animalsResource.reload(),
                })
            );
    }

    delete(animal: Animal): void {
        this.animalService.deleteAnimal(animal)
            .pipe(
                tap({
                    next: () => this.animalsResource.reload(),
                })
            );
    }
}
