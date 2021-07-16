import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getUserByEmail(email: string) {
    return this.db.list<any>('users', ref => ref.orderByChild('email').equalTo(email)
    ).snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
