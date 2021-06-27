import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Dealer } from '../models/dealer';


@Injectable({
  providedIn: 'root'
})
export class DealerService {

  dealers$: Observable<any>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
    ) {
    this.dealers$ = this.db.list<Dealer>('dealers').snapshotChanges();
  }

  createDealer(dealer: Dealer, dealerPhoto: Photo) {

    const photoName = '';

    return new Promise((resolve, reject) => {
      this.db.list('dealers/').push(dealer)
        .then(ref => {
          (async () =>{

            const blob = await fetch(dealerPhoto.webPath).then(r => r.blob());
            console.log('photo', dealerPhoto);
          const fileRef = this.storage.ref(`dealers/${ref.key}`);
          const task = this.storage.upload(`dealers/${ref.key}`, blob);
          task
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(res => {
                  this.db.list(`dealers/${ref.key}/urlImage`).push(res);
                  resolve(ref);
                });
              })
            ).subscribe();
          })();
        });
    });
  }

  getAll() {
    // return this.db
    //   .list<Product>('products')
    //   .snapshotChanges()
    //   .pipe(
    //     map((res: any[]) =>
    //       res.map((r) => ({ id: r.key, ...r.payload.val() }))
    //     ),
    //     map((res: any[]) =>
    //       res.map((r) => {
    //         const imgArr = this.createImagesArr(r.images);
    //         const newp = { ...r };
    //         newp.images = imgArr;
    //         return newp as Product;
    //       })
    //     ),
    //     tap((products) => (this._products = products))
    //   );
    // this.db.list<Dealer>('dealers').snapshotChanges()
    //   .pipe(
    //     map((res: any[]) => {
    //       res.map((r) => {
    //         id: r.key, ...r.payload.val()
    //       })
    //     })
    //   );
  }

  existDealer(name: string) {
    return new Observable(o => {
      this.db.list<Dealer>('dealers', ref => ref.orderByChild('name').equalTo(name))
      .valueChanges()
      .subscribe(data => {
        o.next(data.length === 0 ? false : true);
        o.complete();
      });
    });
  }

  perfObservable() {
    const obs = new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });

    console.log('Just before subscribe');
    // obs.subscribe({
    //   next: x => {
    //     console.log('got value ', x);
    //   },
    //   error: err => console.log('something wrong occurred'),
    //   complete: () => console.log('done')
    // });
    obs.subscribe(data => console.log('data', data));

    console.log('just after subscribe');
  }

  async saveImageToStorage(dealerPhoto: Photo) {

    const blob = await fetch(dealerPhoto.webPath).then(r => r.blob());
    console.log('photo', dealerPhoto);
    this.storage.ref('dealers/nombre');
    this.storage.upload('dealers/nombre', blob).then(resp => console.log('response', resp));

  }
}
