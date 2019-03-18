import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../services/authentication.service';
import { IAuthenticationState } from '../../state/authentication.state';
import { AuthenticationSignIn } from '../../state/authentication.actions';

@Component({
  selector: 'lib-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public account: string = null;
  public password: string = null;

  constructor(private builder: FormBuilder,
              private store: Store<IAuthenticationState>) {
  }

  ngOnInit() {
    this.signInForm = this.builder.group({
      account: [this.account, Validators.required],
      password: [this.password, Validators.required]
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
    this.store.dispatch(new AuthenticationSignIn({account: this.account, password: this.password}));
  }

}
