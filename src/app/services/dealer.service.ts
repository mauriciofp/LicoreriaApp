import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { CameraPhoto } from '@capacitor/core';

import { Observable } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';

import { Dealer } from '../models/dealer';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  dealers$: Observable<any>;

  itemsRef: AngularFireList<any>;
  dealers: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private us: UserService
  ) {
    this.dealers$ = this.db.list<Dealer>('dealers').snapshotChanges();
    this.itemsRef = this.db.list('dealers/');
  }

  createDealer(dealer: Dealer, dealerPhoto: CameraPhoto) {
    const photoName = '';
    const insert = {
      name: dealer.name,
      company: dealer.company,
      email: dealer.email,
    };

    return new Promise((resolve, reject) => {
      this.db
        .list('dealers/')
        .push(dealer)
        .then((ref) => {
          (async () => {
            const blob = await fetch(dealerPhoto.webPath).then((r) => r.blob());
            console.log('photo', dealerPhoto);
            const fileRef = this.storage.ref(`dealers/${ref.key}`);
            const task = this.storage.upload(`dealers/${ref.key}`, blob);

            this.us.getUserByEmail(dealer.email).subscribe((data) => {
              this.db.list('users').update(data[0].id, {
                role: 'DEALER',
                dealerId: ref.key,
              });
            });

            task
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe((res) => {
                    // this.db.list(`dealers/${ref.key}/urlImage`).push(res);
                    this.db.list(`dealers/`).update(ref.key, { urlImage: res });
                    resolve(ref);
                  });
                })
              )
              .subscribe();
          })();
        });
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

  existEmail(email: string, discard?: string) {
    return new Observable((o) => {
      this.db
        .list<Dealer>('dealers', (ref) =>
          ref.orderByChild('email').equalTo(email)
        )
        .valueChanges()
        .subscribe((data) => {
          if (discard) {
            console.log('discard', data.length);
            if (data.length === 1 && data[0].email === discard) {
              o.next(false);
            } else {
              console.log('else', data.length !== 0);
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

  getDealer(id: string): Observable<Dealer> {
    return this.db.object<Dealer>(`dealers/${id}`).valueChanges();
  }

  updateDealer(
    id: string,
    dealer: Dealer,
    dealerPhoto?: CameraPhoto
  ) {
    
    return new Promise((resolve, reject) => {
      if (!dealerPhoto) {
        return this.db
          .list('dealers/')
          .update(id, dealer)
          .then((ref) => {
            resolve(ref);
          });
      } else {
        this.db
          .list(`dealers/`)
          .set(id, dealer)
          .then((ref) => {
            (async () => {
              const blob = await fetch(dealerPhoto.webPath).then((r) =>
                r.blob()
              );
              console.log('photo', dealerPhoto);
              const fileRef = this.storage.ref(`dealers/${id}`);
              const task = this.storage.upload(`dealers/${id}`, blob);
              task
                .snapshotChanges()
                .pipe(
                  finalize(() => {
                    fileRef.getDownloadURL().subscribe((res) => {
                      this.db.list(`dealers/`).update(id, { urlImage: res });
                      resolve(ref);
                    });
                  })
                )
                .subscribe();
            })();
          });
      }
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
}
