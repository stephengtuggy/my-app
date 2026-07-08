import {ChangeDetectionStrategy, Component, debounced, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FoodService} from "../food.service";
import {rxResource} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-food-search',
    templateUrl: './food-search.component.html',
    styleUrls: ['./food-search.component.css'],
    imports: [
        RouterLink
    ],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class FoodSearchComponent {
    private foodService: FoodService = inject(FoodService);

    protected query = signal('');
    protected debouncedQuery = debounced(this.query, 300);

    protected resultsResource = rxResource({
        params: () => this.debouncedQuery.value(),
        stream: ({params}) => this.foodService.searchFoods(params),
    });

    constructor() {
    }
}
