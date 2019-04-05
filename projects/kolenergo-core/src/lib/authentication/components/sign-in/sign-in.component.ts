import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {createFeatureSelector, select, Store} from '@ngrx/store';
import { AuthenticationService } from '../../services/authentication.service';
import { IAuthenticationState } from '../../state/authentication.state';
import { AuthenticationSignIn } from '../../state/authentication.actions';
import * as selectors from '../../state/authentication.selectors';
import { Observable } from 'rxjs';
import {IUser} from '../../../interfaces';
import {selectIsAuthenticationInProgress} from '../../state/authentication.selectors';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public isAuthenticationInProgress$: Observable<boolean>;

  constructor(private builder: FormBuilder,
              private store: Store<IAuthenticationState>) {}

  ngOnInit() {
    this.isAuthenticationInProgress$ = this.store.pipe(select(selectIsAuthenticationInProgress));
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

  signIn() {
    this.store.dispatch(
      new AuthenticationSignIn({
        account: this.signInForm.get('account').value,
        password: this.signInForm.get('password').value
      })
    );
  }

}
