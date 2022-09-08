import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private tokenExpirationDuration: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationDuration = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationDuration) {
      clearTimeout(this.tokenExpirationDuration);
      this.tokenExpirationDuration = null;
    }
  }
}
