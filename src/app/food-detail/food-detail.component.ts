import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location, UpperCasePipe} from '@angular/common';
import {FoodService} from "../food.service";
import {Food} from "../food.model";
import {form, FormField} from "@angular/forms/signals";
import {tap} from "rxjs/operators";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-food-detail',
    templateUrl: './food-detail.component.html',
    styleUrls: ['./food-detail.component.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        UpperCasePipe,
        FormField
    ],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class FoodDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private foodService = inject(FoodService);
    private location = inject(Location);

    foodModel = signal<Food>({
        name: '',
        id: -1,
    });

    foodForm = form(this.foodModel);

    constructor() {
    }

    ngOnInit() {
        this.getFood();
    }

    getFood(): void {
        const id: number = +(this.route?.snapshot?.paramMap?.get('id') ?? 0);
        this.foodService.getFood(id).subscribe(food => {
            this.foodForm.name().value.set(food.name);
            this.foodForm.id().value.set(food.id);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.foodService.updateFood({ name: this.foodForm.name().value(), id: this.foodForm.id().value()})
            .pipe(
                tap({
                    next: () => this.goBack(),
                })
            );
    }
}
