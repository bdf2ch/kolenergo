import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthenticationSignIn, IUser } from '@kolenergo/core';
import { ApplicationOpenAddRequestDialog } from '../../ngrx/application.actions';
import { IApplicationState } from '../../ngrx/application.state';
import { selectUser } from '../../ngrx/selectors';
import { selectAuthenticationInProgress } from '../../ngrx/selectors';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.less']
})
export class SignInModalComponent implements OnInit {
  user$: Observable<IUser>;
  user: IUser;
  showPassword: boolean;
  authenticationInProgress$: Observable<boolean>;
  signInForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly dialog: MatDialogRef<SignInModalComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: {fromAddRequestDialog: boolean},
    private readonly store: Store<IApplicationState>
  ) {
    this.user$ = this.store.pipe(select(selectUser));
    this.user$.subscribe((user: IUser) => {
      this.user = user;
    });
    this.showPassword = false;
    this.authenticationInProgress$ = this.store.pipe(select(selectAuthenticationInProgress));
    this.signInForm = this.builder.group({
      account: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.dialog.afterClosed().subscribe(() => {
      if (this.data.fromAddRequestDialog === true && this.user) {
        this.store.dispatch(new ApplicationOpenAddRequestDialog());
      }
    });
  }

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
