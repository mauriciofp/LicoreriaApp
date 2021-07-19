import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../state/app.reducer';
import * as authActions from '../state/actions/auth.action';

import { User, UserRole } from '../models/user.model';
import { OnesignalService } from './onesignal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubs: Subscription;

  private _user: User;

  get isAdmin() {
    return this._user?.role === UserRole.admin;
  }

  get isDealer() {
    return this._user?.role === UserRole.dealer;
  }

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private onesignalService: OnesignalService,
    private store: Store<AppState>
  ) {}

  register({ name, email, password, phone }) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return this.db
          .object(`users/${res.user.uid}`)
          .set({ uid: res.user.uid, name, email, role: UserRole.user, phone });
      });
  }

  login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password).then((ref) => {
      return this.db
        .object(`users/${ref.user.uid}`)
        .update({ onesignalId: this.onesignalService.onesignalId });
    });
  }

  logout() {
    return this.db
      .object(`users/${this._user.uid}`)
      .update({ onesignalId: null })
      .then(() => {
        return this.auth.signOut();
      });
  }

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubs = this.db
          .object(`users/${fuser.uid}`)
          .valueChanges()
          .subscribe((user: any) => {
            this._user = User.fromFirebase(user);
            this.store.dispatch(authActions.setUser({ user: this._user }));
          });
      } else {
        this._user = null;
        this.userSubs?.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
      }
    });
  }

  isAuth() {
    return this.auth.authState.pipe(map((user) => user !== null));
  }

  canRead() {
    return this._user ? this._user.role !== UserRole.user : false;
  }

  canWrite() {
    return this._user ? this._user.role === UserRole.admin : false;
  }
}
