import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { CameraPhoto } from '@capacitor/core';

import { Observable, of } from 'rxjs';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';

import { Dealer } from '../models/dealer';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  dealers$: Observable<any>;

  itemsRef: AngularFireList<any>;
  dealers: Observable<any[]>;

  dealer: Dealer;
  dealerRoot = 'dealers';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private us: UserService
  ) {
    this.dealers$ = this.db.list<Dealer>('dealers').snapshotChanges();
    this.itemsRef = this.db.list('dealers/');
  }

  create({ email, name, company, phones }, image: Blob) {
    return this.db
      .list(this.dealerRoot)
      .push({ email, name, company, phones })
      .then((ref) => {
        console.log('llegue');
        const filePath = this.generateFileName();
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, image);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((res) => {
                this.db
                  .object(`${this.dealerRoot}/${ref.key}/`)
                  .update({ urlImage: res });
              });
            })
          )
          .subscribe();
      });
  }

  edit(
    id: string,
    { email, name, company, phones },
    urlImage: string,
    image?: Blob
  ) {
    return this.db
      .object(`${this.dealerRoot}/${id}`)
      .update({ email, name, company, phones })
      .then(() => {
        if (image) {
          const filePath = this.generateFileName();
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, image);
          task
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((res) => {
                  this.db
                    .object(`${this.dealerRoot}/${id}`)
                    .update({ urlImage: res })
                    .then(() => {
                      this.storage.refFromURL(urlImage).delete().subscribe();
                    });
                });
              })
            )
            .subscribe();
        }
      });
  }

  getAll() {
    this.itemsRef = this.db.list('dealers');
    this.dealers = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );

    return this.dealers;
  }

  getDealer(id: string): Observable<Dealer> {
    return this.db
      .object<Dealer>(`dealers/${id}`)
      .valueChanges()
      .pipe(
        map((res) => Dealer.fromFirebase(res)),
        tap((dealer) => (this.dealer = dealer))
      );
  }

  existEmail(email: string, discard?: string) {
    return this.db
      .list<User>('users')
      .valueChanges()
      .pipe(
        take(1),
        map((users) => (users.find((u) => u.email === email) ? true : false)),
        catchError((err) => of(false))
      );
  }

  existDealer(name: string, discard?: string) {
    return new Observable((o) => {
      this.db
        .list<Dealer>('dealers', (ref) =>
          ref.orderByChild('name').equalTo(name)
        )
        .valueChanges()
        .subscribe((data) => {
          if (discard) {
            if (data.length === 1 && data[0].name === discard) {
              o.next(false);
            } else {
              o.next(data.length === 0 ? false : true);
            }
          } else {
            o.next(data.length === 0 ? false : true);
          }
          o.complete();
        });
    });
  }

  existUser(email: string, discard?: string) {
    return new Observable((o) => {
      this.db
        .list<Dealer>('users', (ref) =>
          ref.orderByChild('email').equalTo(email)
        )
        .valueChanges()
        .subscribe((data) => {
          if (discard) {
            console.log('discard', data.length);
            if (data.length === 1 && data[0].email === discard) {
              o.next(false);
            } else {
              o.next(data.length === 0 ? false : true);
            }
          } else {
            console.log('value', data.length === 0 ? false : true);
            o.next(data.length === 0 ? false : true);
          }
          o.complete();
        });
    });
  }

  getUserId(id: string) {
    return this.db
      .list<any>('user_dealer', (ref) =>
        ref.orderByChild('dealerId').equalTo(id)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  deleteDealer(id: string, urlImage) {
    this.storage.refFromURL(urlImage).delete();
    return this.db.list('dealers/').remove(id);
  }

  private generateFileName(): string {
    return `${this.dealerRoot}/${new Date().getTime()}`;
  }
}
