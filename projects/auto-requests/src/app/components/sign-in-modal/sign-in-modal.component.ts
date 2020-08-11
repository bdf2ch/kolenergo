import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthenticationSignIn } from '@kolenergo/core';
import { IApplicationState } from '../../ngrx';
import { selectAuthenticationInProgress } from '../../ngrx/selectors';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.less']
})
export class SignInModalComponent implements OnInit {
  showPassword: boolean;
  authenticationInProgress$: Observable<boolean>;
  signInForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.showPassword = false;
    this.authenticationInProgress$ = this.store.pipe(select(selectAuthenticationInProgress));
    this.signInForm = this.builder.group({
      account: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

  /**
   * Аутентификация пользователя
   */
  signIn() {
    if (this.signInForm.valid) {
      this.store.dispatch(
        new AuthenticationSignIn({
          account: this.signInForm.controls.account.value,
          password: this.signInForm.controls.password.value
        })
      );
    }
  }

}
