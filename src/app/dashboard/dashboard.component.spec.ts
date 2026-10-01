import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangeDetectionStrategy, Component, DebugElement, Type} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {beforeEach, describe, expect, it} from "vitest";

import {DashboardComponent} from './dashboard.component';
import {provideHttpClient} from '@angular/common/http';
import {By} from "@angular/platform-browser";

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

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

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display title "Top Animals" in h3', async () => {
        fixture.detectChanges();
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
