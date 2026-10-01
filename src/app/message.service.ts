import { Service } from '@angular/core';

@Service()
export class MessageService {
    messages: string[] = [];

    constructor() {
    }

    add(message: string): void {
        this.messages.push(message);
    }

    clear(): void {
        this.messages = [];
    }
}
