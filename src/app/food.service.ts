import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Food} from './food.model';
import {MessageService} from "./message.service";


@Injectable({
    providedIn: 'root',
})
export class FoodService {
    private http: HttpClient = inject(HttpClient);
    private messageService: MessageService = inject(MessageService);

    private readonly foodsUrl = `api/foods`;
    private readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        responseType: "json",
    };

    constructor() {
    }

    getFoods(): Observable<Food[]> {
        return this.http.get<Food[]>(this.foodsUrl, {headers: this.httpOptions.headers, responseType: 'json'})
            .pipe(
                tap({
                    next: (foods) => this.log(`fetched ${foods.length} foods`),
                    error: this.handleError<Food[]>('getAllFoods', []),
                }),
            );
    }

    getFood(id: number): Observable<Food> {
        const url = `${this.foodsUrl}/${id}`;
        return this.http.get<Food>(url, {headers: this.httpOptions.headers, responseType: 'json'})
            .pipe(
                tap({
                    next: (f) => this.log(`fetched food id=${id}. Its name is ${f.name}`),
                    error: this.handleError<Food>(`getFood id=${id}`),
                }),
            );
    }

    getFoodNo404(id: number): Observable<Food> {
        const url = `${this.foodsUrl}/?id=${id}`;
        return this.http.get<Food[]>(url, {headers: this.httpOptions.headers, responseType: 'json'})
            .pipe(
                map(foods => foods[0]),
                tap({
                    next: (f) => {
                        const outcome = f ? `fetched` : `did not find`;
                        this.log(`${outcome} food id=${id}`);
                    },
                    error: this.handleError<Food>(`getFoodNo404 id=${id}`),
                }),
            );
    }

    searchFoods(term: string): Observable<Food[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<Food[]>(`${this.foodsUrl}/?name=${term}`, {
            headers: this.httpOptions.headers,
            responseType: 'json'
        })
            .pipe(
                tap({
                    next: (foods) => {
                        foods.length ?
                            this.log(`found foods matching "${term}"`) :
                            this.log(`no food matching "${term}"`);
                    },
                    error: this.handleError<Food[]>(`searchFoods term=${term}`, []),
                })
            );
    }

    addFood(food: Food): Observable<Food> {
        return this.http.post<Food>(this.foodsUrl, food, {
            headers: this.httpOptions.headers,
            responseType: "json"
        }).pipe(
            tap({
                next: (newFood) => this.log(`added food w/ id=${newFood.id} and name=${newFood.name}`),
                error: this.handleError<Food>('addFood')
            }),
        );
    }

    updateFood(food: Food): Observable<any> {
        const url = `${this.foodsUrl}/${food.id}`;
        return this.http.put(url, food, {headers: this.httpOptions.headers, responseType: "json"}).pipe(
            tap({
                next: _ => this.log(`updated food w/ id=${food.id}. Its name is now ${food.name}`),
                error: this.handleError<any>('updateFood'),
            }),
        );
    }

    deleteFood(food: Food | number): Observable<Food> {
        const id: number = typeof food === 'number' ? food : food.id;
        const url = `${this.foodsUrl}/${id}`;

        return this.http.delete<Food>(url, {headers: this.httpOptions.headers, responseType: "json"}).pipe(
            tap({
                next: (food) => this.log(`deleted food id=${id} (name=${food.name}`),
                error: this.handleError<Food>(`deleteFood id=${id}`),
            })
        );
    }

    private log(message: string): void {
        this.messageService.add(`FoodService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T): any {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error);

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }
}
