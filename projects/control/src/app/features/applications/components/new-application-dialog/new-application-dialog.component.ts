import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Application } from '../../../../models';
import { IApplicationState } from '../../../../ngrx';
import { ApplicationsAddApplication } from '../../ngrx';


@Component({
  selector: 'app-new-application-dialog',
  templateUrl: './new-application-dialog.component.html',
  styleUrls: ['./new-application-dialog.component.less']
})
export class NewApplicationDialogComponent implements OnInit {
  newApplicationForm: FormGroup;
  application: Application;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.application = new Application();
    this.newApplicationForm = this.builder.group({
      title: new FormControl(this.application.title, Validators.required),
      description: new FormControl(this.application.description, Validators.required),
      code: new FormControl(this.application.code, Validators.required),
      icon: new FormControl(this.application.icon),
      color: new FormControl(this.application.color)
    });
  }

  ngOnInit() {}

  /**
   * Добавление нового приложения
   */
  addApplication() {
    this.application.title = this.newApplicationForm.controls.title.value;
    this.application.description = this.newApplicationForm.controls.description.value;
    this.application.code = this.newApplicationForm.controls.code.value;
    this.application.icon = this.newApplicationForm.controls.icon.value;
    this.application.color = this.newApplicationForm.controls.color.value;
    this.store.dispatch(new ApplicationsAddApplication(this.application));
  }
}
