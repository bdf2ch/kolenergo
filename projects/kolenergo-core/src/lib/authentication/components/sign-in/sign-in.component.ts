import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

import { AuthenticationSignIn } from '../../state/authentication.actions';
import * as selectors from '../../state/authentication.selectors';
import { IApplicationState } from '../../../interfaces';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public isAuthenticationInProgress$: Observable<boolean>;
  public showPassword = false;

  constructor(private readonly builder: FormBuilder,
              private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.isAuthenticationInProgress$ = this.store.pipe(
      select(selectors.selectIsInProgress),
      tap((value: boolean) => {
        console.log('isAuthenticationInProgress', value);
        if (value) {
          this.signInForm.get('account').disable();
          this.signInForm.get('password').disable();
        } else {
          this.signInForm.get('account').enable();
          this.signInForm.get('password').enable();
        }
      })
    );
    this.signInForm = this.builder.group({
      account: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  getFormErrorMessage(field: string) {
    switch (field) {
      case 'account':
        return 'Вы не ввели учетную запись';
        break;
      case 'password':
        return 'Вы не ввели пароль';
        break;
    }
  }

  showHidePassword() {
    let isLoadingInProgress = null;
    this.isAuthenticationInProgress$.subscribe((value: boolean) => {
      isLoadingInProgress = value;
    });
    if (!isLoadingInProgress) {
      this.showPassword = ! this.showPassword;
    }
  }

  signIn() {
    this.store.dispatch(
      new AuthenticationSignIn({
        account: this.signInForm.get('account').value,
        password: this.signInForm.get('password').value
      })
    );
  }

}
