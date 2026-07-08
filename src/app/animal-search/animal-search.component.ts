import {ChangeDetectionStrategy, Component, debounced, inject, signal} from '@angular/core';
import {AnimalService} from '../animal.service';
import {RouterLink} from '@angular/router';
import {rxResource} from "@angular/core/rxjs-interop";


@Component({
    selector: 'app-animal-search',
    templateUrl: './animal-search.component.html',
    styleUrls: ['./animal-search.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class AnimalSearchComponent {
    private animalService = inject(AnimalService);

    protected query = signal('');
    protected debouncedQuery = debounced(this.query, 300);

    protected resultsResource = rxResource({
        params: () => this.debouncedQuery.value(),
        stream: ({params}) => this.animalService.searchAnimals(params),
    });

    constructor() {
    }
}
