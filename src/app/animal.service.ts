import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Animal } from './animal.model';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private readonly animalsUrl = `api/animals`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.animalsUrl, { headers: this.httpOptions.headers, responseType: 'json' })
      .pipe(
        tap(_ => this.log('fetched animals')),
        catchError(this.handleError<Animal[]>('getAnimals', []))
      );
  }

  getAnimalNo404<Data>(id: number): Observable<Animal> {
    const url = `${this.animalsUrl}/?id=${id}`;
    return this.http.get<Animal[]>(url)
      .pipe(
        map(animals => animals[0]),
        tap(a => {
          const outcome = a ? `fetched` : `did not find`;
          this.log(`${outcome} animal id=${id}`);
        }),
        catchError(this.handleError<Animal>(`getAnimalNo404 id=${id}`))
      );
  }

  getAnimal(id: number): Observable<Animal> {
    const url = `${this.animalsUrl}/${id}`;
    return this.http.get<Animal>(url).pipe(
      tap(_ => this.log(`fetched animal id=${id}`)),
      catchError(this.handleError<Animal>(`getAnimal id=${id}`))
    );
  }

  searchAnimals(term: string): Observable<Animal[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Animal[]>(`${this.animalsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found animals matching "${term}"`) :
         this.log(`no animals matching "${term}"`)),
      catchError(this.handleError<Animal[]>('searchAnimals', []))
    );
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.animalsUrl, animal, this.httpOptions).pipe(
      tap((newAnimal: Animal) => this.log(`added animal w/ id=${newAnimal.id}`)),
      catchError(this.handleError<Animal>('addAnimal'))
    );
  }

  updateAnimal(animal: Animal): Observable<any> {
    return this.http.put(this.animalsUrl, animal, this.httpOptions).pipe(
      tap(_ => this.log(`updated animal id=${animal.id}`)),
      catchError(this.handleError<any>('updateAnimal'))
    );
  }

  deleteAnimal(animal: Animal | number): Observable<Animal> {
    const id = typeof animal === 'number' ? animal : animal.id;
    const url = `${this.animalsUrl}/${id}`;

    return this.http.delete<Animal>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted animal id=${id}`)),
      catchError(this.handleError<Animal>('deleteAnimal'))
    );
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

}
