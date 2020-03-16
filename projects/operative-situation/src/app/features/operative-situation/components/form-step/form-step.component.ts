import {Component, ElementRef, Host, Input, OnInit, Optional} from '@angular/core';

import { FormWithStepsComponent } from '../form-with-steps/form-with-steps.component';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.less']
})
export class FormStepComponent implements OnInit {
  public isSelected: boolean;
  @Input() caption: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() isValid: boolean;
  @Input() isInvalid: boolean;

  constructor(
    @Host() @Optional() private readonly form: FormWithStepsComponent,
    public readonly element: ElementRef
  ) {
    this.isSelected = false;
    this.isValid = false;
    this.isInvalid = false;
  }

  ngOnInit() {
    console.log('element', this.element.nativeElement);
    if (this.form) {
      this.form.registerStep(this);
    }
  }
}
