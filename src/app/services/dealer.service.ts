import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

import { Observable } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';

import { Dealer } from '../models/dealer';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  dealers$: Observable<any>;

  itemsRef: AngularFireList<any>;
  dealers: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.dealers$ = this.db.list<Dealer>('dealers').snapshotChanges();
    this.itemsRef = this.db.list('dealers/');
  }

  createDealer(dealer: Dealer, dealerPhoto: Photo) {
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

    // return new Promise((resolve, reject) => {
    //   this.db
    //     .list('dealers/')
    //     .push(insert)
    //     .then((ref) => {
    //       (async () => {
    //         dealer.phones.forEach((element) => {
    //           this.db.list(`dealers/${ref.key}/phones`).push(element);
    //         });

    //         const blob = await fetch(dealerPhoto.webPath).then((r) => r.blob());
    //         console.log('photo', dealerPhoto);
    //         const fileRef = this.storage.ref(`dealers/${ref.key}`);
    //         const task = this.storage.upload(`dealers/${ref.key}`, blob);
    //         task
    //           .snapshotChanges()
    //           .pipe(
    //             finalize(() => {
    //               fileRef.getDownloadURL().subscribe((res) => {
    //                 // this.db.list(`dealers/${ref.key}/urlImage`).push(res);
    //                 this.db.list(`dealers/`).update(ref.key, { urlImage: res });
    //                 resolve(ref);
    //               });
    //             })
    //           )
    //           .subscribe();
    //       })();
    //     });
    // });
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
            if (data.length === 1 && data[0].email === discard) {
              o.next(false);
            } else {
              o.next(data.length === 0 ? false : true);
            }
          } else {
            o.next(data.length === 0 ? false : true);
            o.complete();
          }
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

  updateDealer(id: string, dealer: Dealer, dealerPhoto?: Photo) {
    // this.db.list('dealers/').set(id, dealer);
    return new Promise((resolve, reject) => {
      if (!dealerPhoto) {
        return this.db
          .list('dealers/')
          .update(id, dealer)
          .then((ref) => resolve(ref));
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
                      // this.db.list(`dealers/${ref.key}/urlImage`).push(res);
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

  deleteDealer(id: string, urlImage) {
    this.storage.refFromURL(urlImage).delete();
    return this.db.list('dealers/').remove(id);
  }
}
