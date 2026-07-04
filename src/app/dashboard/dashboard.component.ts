import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AnimalService} from '../animal.service';
import {RouterLink} from '@angular/router';
import {AnimalSearchComponent} from '../animal-search/animal-search.component';
import {rxResource} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, AnimalSearchComponent]
})
export class DashboardComponent {
    private animalService = inject(AnimalService);

    protected animalsResource = rxResource({
        params: () => ({}),

        stream: ({params}) => this.animalService.getAnimals(),
    });

    constructor() {
    }
}
