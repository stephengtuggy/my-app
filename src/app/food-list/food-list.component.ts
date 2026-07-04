import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FoodService} from "../food.service";
import {rxResource} from "@angular/core/rxjs-interop";
import {Food} from "../food.model";
import {tap} from "rxjs/operators";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-food-list',
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        RouterLink
    ]
})
export class FoodListComponent {
    private foodService: FoodService = inject(FoodService);

    protected foodsResource = rxResource({
        params: () => ({}),

        stream: ({params}) => this.foodService.getFoods(),
    });

    constructor() {
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.foodService.addFood({name} as Food)
            .pipe(
                tap({
                    next: () => this.foodsResource.reload(),
                })
            );
    }

    delete(food: Food): void {
        this.foodService.deleteFood(food)
            .pipe(
                tap({
                    next: () => this.foodsResource.reload(),
                })
            );
    }
}
