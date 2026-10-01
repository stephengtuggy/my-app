import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {beforeEach, describe, expect, it} from "vitest";
import {doesNotThrow} from "node:assert";

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        service = TestBed.inject(MessageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('does not throw on adding message', () => {
        doesNotThrow(() => {
            service.add("Test Message");
        });
    });

    it('does not throw on clearing messages', () => {
        doesNotThrow(() => {
            service.clear();
        });
    });
});
