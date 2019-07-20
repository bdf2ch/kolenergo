import { FormStep } from './form-step.model';

export class FormStepManager {
  public steps: FormStep[];

  constructor() {
    this.steps = [];
  }

  addStep(step: FormStep) {
    this.steps.push(step);
    this.steps[0].isActive = true;
  }

  selectStep(stepIndex: number) {
    this.steps.forEach((step: FormStep, index: number) => {
      step.isActive = index === stepIndex ? true : false;
    });
  }

  getSelectedStep(): FormStep {
    let result = null;
    this.steps.forEach((step: FormStep) => {
      if (step.isActive) {
        result = step;
      }
    });
    return result;
  }
}
