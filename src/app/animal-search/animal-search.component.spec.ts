import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement, Type} from '@angular/core';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {AnimalSearchComponent} from './animal-search.component';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from "@angular/router";
import {By} from "@angular/platform-browser";

describe('AnimalSearchComponent', () => {
    let component: AnimalSearchComponent;
    let fixture: ComponentFixture<AnimalSearchComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnimalSearchComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
                AnimalSearchComponent,
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(AnimalSearchComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display caption "Animal Search" in h4 tag', async () => {
        fixture.detectChanges();
        const h4De: DebugElement = fixture.debugElement.query(By.css('h4'));
        const h4El: HTMLElement = h4De.nativeElement;
        expect(h4El.textContent).toEqual("Animal Search");
    });
});
