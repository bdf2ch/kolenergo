import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ApplicationService} from '../services/application.service';
import {PhoneBookSetApplicationMode} from './application.actions';
import {switchMap} from 'rxjs/operators';
import {ROUTER_NAVIGATED, RouterNavigatedAction} from '@ngrx/router-store';
import {EApplicationMode} from '../enums';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly application: ApplicationService
  ) {}

  @Effect()
  routerNavigated$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    switchMap((action) => {
      console.log('router action', (action as RouterNavigatedAction).payload.routerState);
      let mode = EApplicationMode.APPLICATION_MODE_CONTACT_LIST;
      switch ((action as RouterNavigatedAction).payload.routerState.url) {
        case '/favorites':
          mode = EApplicationMode.APPLICATION_MODE_FAVORITE_CONTACTS;
          break;
        case '/account':
          mode = EApplicationMode.APPLICATION_MODE_USER_ACCOUNT;
          break;
        case '/help':
          mode = EApplicationMode.APPLICATION_MODE_HELP;
          break;
        default:
          mode = EApplicationMode.APPLICATION_MODE_CONTACT_LIST;
          break;
      }
      return of(new PhoneBookSetApplicationMode(mode));
    })
  );
}
