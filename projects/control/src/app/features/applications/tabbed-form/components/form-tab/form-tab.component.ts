import {Component, Host, Input, OnInit, Optional} from '@angular/core';
import {TabbedFormComponent} from '../tabbed-form/tabbed-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kol-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.less']
})
export class FormTabComponent implements OnInit {
  @Input() caption: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() valid: boolean;
  @Input() invalid: boolean;
  public id: number;
  public isActive: boolean;

  constructor(@Host() @Optional() private form: TabbedFormComponent) {
    this.isActive = false;
    if (form) {
      this.id = form.tabs.push(this);
    }
  }

  ngOnInit() {
  }

}
