import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);


  constructor() { }

  ngOnInit(): void {
  }

}
