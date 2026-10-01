import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangeDetectionStrategy, Component, DebugElement, Type} from '@angular/core';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {DashboardComponent} from './dashboard.component';
import {provideHttpClient} from '@angular/common/http';
import {By} from "@angular/platform-browser";

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockAnimalSearchComponent,
                DashboardComponent,
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                MockAnimalSearchComponent,
                DashboardComponent,
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display page title "Top Animals" in h3', async () => {
        fixture.detectChanges();
        httpMock.expectOne('api/animals');
        const h3De: DebugElement = fixture.debugElement.query(By.css('h3'));
        const h3El: HTMLElement = h3De.nativeElement;
        expect(h3El.textContent).toEqual("Top Animals");
    });
});

@Component({
    selector: 'app-animal-search',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager
})
class MockAnimalSearchComponent {
}
