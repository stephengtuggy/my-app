import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {ChangeDetectionStrategy, Component, Type} from '@angular/core';
import {beforeEach, describe, expect, it} from "vitest";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockMessageOutlet,
                AppComponent,
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
                MockMessageOutlet,
                AppComponent,
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
        await fixture.whenStable();
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'Zoo Example'`, () => {
        expect(component.title).toEqual('Zoo Example');
    });

    it('should render title in a h1 tag', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Zoo Example');
    });
});

@Component({
    selector: 'app-messages',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
class MockMessageOutlet {
}
