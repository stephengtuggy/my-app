import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MessagesComponent} from './messages/messages.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterOutlet, MessagesComponent]
})
export class AppComponent {
    title = 'Zoo Example';
}
