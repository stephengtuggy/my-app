import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement, Type} from '@angular/core';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

import {AnimalListComponent} from './animal-list.component';
import {provideHttpClient} from '@angular/common/http';
import {afterEach, beforeEach, describe, expect, it} from "vitest";
import {By} from "@angular/platform-browser";

describe('AnimalListComponent', () => {
    let component: AnimalListComponent;
    let fixture: ComponentFixture<AnimalListComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnimalListComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(AnimalListComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display page title "Animals" in h2 tag', async () => {
        fixture.detectChanges();
        httpMock.expectOne('api/animals');
        const h2De: DebugElement = fixture.debugElement.query(By.css('h2'));
        const h2El: HTMLElement = h2De.nativeElement;
        expect(h2El.textContent).toEqual("Animals");
    });
});
