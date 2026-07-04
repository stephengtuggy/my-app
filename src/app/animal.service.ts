import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequestOptions} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Animal} from './animal.model';
import {MessageService} from './message.service';


@Injectable({
    providedIn: 'root',
})
export class AnimalService {
    private http: HttpClient = inject(HttpClient);
    private messageService: MessageService = inject(MessageService);

    private readonly animalsUrl = `api/animals`;
    private readonly httpOptions: HttpRequestOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
    };

    constructor() {
    }

    private log(message: string): void {
        this.messageService.add(`AnimalService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T): any {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error);

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getAnimals(): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.animalsUrl, {headers: this.httpOptions.headers, responseType: "json"})
            .pipe(
                tap({
                    next: (animals) => this.log(`fetched ${animals.length} animals`),
                    error: this.handleError<Animal[]>('getAnimals', []),
                }),
            );
    }

    getAnimalNo404(id: number): Observable<Animal> {
        const url = `${this.animalsUrl}/?id=${id}`;
        return this.http.get<Animal[]>(url, {headers: this.httpOptions.headers, responseType: 'json'})
            .pipe(
                map(animals => animals[0]),
                tap({
                    next: (a) => {
                        const outcome = a ? `fetched` : `did not find`;
                        this.log(`${outcome} animal id=${id}`);
                    },
                    error: this.handleError<Animal>(`getAnimalNo404 id=${id}`),
                }),
            );
    }

    getAnimal(id: number): Observable<Animal> {
        const url = `${this.animalsUrl}/${id}`;
        return this.http.get<Animal>(url, {headers: this.httpOptions.headers, responseType: 'json'})
            .pipe(
                tap({
                    next: (a) => this.log(`fetched animal id=${id}. Its name is ${a.animalName}`),
                    error: this.handleError<Animal>(`getAnimal id=${id}`),
                }),
            );
    }

    searchAnimals(term: string): Observable<Animal[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<Animal[]>(`${this.animalsUrl}/?name=${term}`, {
            headers: this.httpOptions.headers,
            responseType: 'json'
        })
            .pipe(
                tap({
                    next: (x) => {
                        x.length ?
                            this.log(`found animals matching "${term}"`) :
                            this.log(`no animals matching "${term}"`);
                    },
                    error: this.handleError<Animal[]>(`searchAnimals term=${term}`, []),
                }),
            );
    }

    addAnimal(animal: Animal): Observable<Animal> {
        return this.http.post<Animal>(this.animalsUrl, animal, {
            headers: this.httpOptions.headers,
            responseType: 'json'
        }).pipe(
            tap({
                next: (newAnimal: Animal) => this.log(`added animal w/ id=${newAnimal.id} and name ${newAnimal.animalName}`),
                error: this.handleError<Animal>('addAnimal'),
            }),
        );
    }

    updateAnimal(animal: Animal): Observable<any> {
        const url = `${this.animalsUrl}/${animal.id}`;
        return this.http.put(url, animal, {headers: this.httpOptions.headers, responseType: 'json'}).pipe(
            tap({
                next: _ => this.log(`updated animal id=${animal.id}. New name ${animal.animalName}`),
                error: this.handleError<any>('updateAnimal'),
            }),
        );
    }

    deleteAnimal(animal: Animal | number): Observable<Animal> {
        const id: number = typeof animal === 'number' ? animal : animal.id;
        const url = `${this.animalsUrl}/${id}`;

        return this.http.delete<Animal>(url, {headers: this.httpOptions.headers, responseType: 'json'}).pipe(
            tap({
                next: (animal) => this.log(`deleted animal id=${id} (name=${animal.animalName})`),
                error: this.handleError<Animal>(`deleteAnimal id=${id}`),
            }),
        );
    }
}
