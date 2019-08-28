import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; }']
})
export class AppComponent {
  title = 'press-reports';
}
