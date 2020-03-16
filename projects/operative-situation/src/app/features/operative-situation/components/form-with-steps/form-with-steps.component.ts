import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormStepComponent } from '../form-step/form-step.component';

@Component({
  selector: 'app-form-with-steps',
  templateUrl: './form-with-steps.component.html',
  styleUrls: ['./form-with-steps.component.less']
})
export class FormWithStepsComponent implements OnInit, AfterContentInit {
  @Input() caption: string;
  @Input() actionTitle: string;
  @Input() actionDisabled: boolean;
  @Output() action: EventEmitter<any>;
  public steps: FormStepComponent[];

  constructor() {
    this.steps = [];
    this.action = new EventEmitter<any>();
  }

  ngOnInit() {}

  registerStep(step: FormStepComponent) {
    this.steps.push(step);
  }

  selectStep(step: FormStepComponent) {
    this.steps.forEach((item: FormStepComponent) => {
      if (item === step) {
        item.isSelected = true;
        item.element.nativeElement.style.height = '100%';
      } else {
        item.isSelected = false;
        item.element.nativeElement.style.height = 'auto';
      }
    });
  }

  processForm() {
    this.action.emit();
  }

  ngAfterContentInit(): void {
    if (this.steps.length > 0) {
      this.selectStep(this.steps[0]);
    }
  }
}
