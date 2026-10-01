import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {MessagesComponent} from './messages.component';
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {DebugElement, Type} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MessageService} from "../message.service";

describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MessagesComponent,
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    // it('should display page title "Messages" in h2 tag', async () => {
    //     fixture.detectChanges();
    //     const msgSvc: MessageService = component.messageService;
    //     msgSvc.add("Test Message");
    //
    //     await fixture.whenStable();
    //     await expect.poll(() => fixture.debugElement.query(By.css('h2')), {
    //         timeout: 2500,
    //         interval: 20
    //     }).toBeDefined();
    //     const h2De: DebugElement = fixture.debugElement.query(By.css('h2'));
    //     await expect.poll(() => h2De.nativeElement, {
    //         timeout: 2500,
    //         interval: 20
    //     }).toBeDefined();
    //     const h2El: HTMLElement = h2De.nativeElement;
    //     expect(h2El.textContent).toEqual("Messages");
    // });
});
