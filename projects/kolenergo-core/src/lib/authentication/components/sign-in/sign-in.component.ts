import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {createFeatureSelector, select, Store} from '@ngrx/store';
import { AuthenticationService } from '../../services/authentication.service';
import { IAuthenticationState } from '../../state/authentication.state';
import { AuthenticationSignIn } from '../../state/authentication.actions';
import * as selectors from '../../state/authentication.selectors';
import { Observable } from 'rxjs';
import {IUser} from '../../../interfaces';

@Component({
  selector: 'lib-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  // public isFetchingData$: Observable<boolean> = this.store.pipe(createFeatureSelector());

  constructor(private builder: FormBuilder,
              private store: Store<IAuthenticationState>) {}

  ngOnInit() {
    this.signInForm = this.builder.group({
      account: [null, Validators.required],
      password: [null, Validators.required]
    });

    /*
    this.isFetchingData$.subscribe((value: boolean) => {
      console.log('isFetchingData', value);
    });
    */


    this.store.select(state => state.isFetchingData).subscribe((isFetchingData: boolean) => {
      console.log('isFetchingData', isFetchingData);
    });

    this.store.select(state => state.user).subscribe((user: IUser) => {
      console.log('user', user);
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
