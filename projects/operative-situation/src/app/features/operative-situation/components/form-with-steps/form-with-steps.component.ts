import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { FormStepComponent } from '../form-step/form-step.component';

@Component({
  selector: 'app-form-with-steps',
  templateUrl: './form-with-steps.component.html',
  styleUrls: ['./form-with-steps.component.less']
})
export class FormWithStepsComponent implements OnInit {
  @Input() caption: string;
  @Input() actionTitle: string;
  @Output() action: EventEmitter<any>;
  public steps: FormStepComponent[];

  constructor() {
    this.steps = [];
    this.action = new EventEmitter<any>();
  }

  ngOnInit() {}

  registerStep(step: FormStepComponent) {
    this.steps.push(step);
    this.steps[0].isSelected = true;
  }

  selectStep(step: FormStepComponent) {
    this.steps.forEach((item: FormStepComponent) => {
      item.isSelected = item === step ? true : false;
    });
  }

  processForm() {
    this.action.emit();
  }
}
