import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {Animal} from '../animal.model';
import {AnimalService} from '../animal.service';
import {RouterLink} from '@angular/router';
import {AnimalSearchComponent} from '../animal-search/animal-search.component';
import {Observable} from "rxjs";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, AnimalSearchComponent, AsyncPipe]
})
export class DashboardComponent implements OnInit {
    private animalService = inject(AnimalService);

    animals$: Observable<Animal[]> | undefined = undefined;

    constructor() {
    }

    ngOnInit() {
        this.animals$ = this.animalService.getAnimals();
    }
}
