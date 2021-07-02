import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

import { Observable } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';

import { Dealer } from '../models/dealer';


@Injectable({
  providedIn: 'root'
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
                  // this.db.list(`dealers/${ref.key}/urlImage`).push(res);
                  this.db.list(`dealers/`).update(ref.key, {urlImage: res});
                  resolve(ref);
                });
              })
            ).subscribe();
          })();
        });
    });
  }

  getAll() {
    this.itemsRef = this.db.list('dealers');
    this.dealers = this.itemsRef.snapshotChanges()
      .pipe(
          map(changes =>
            changes.map(c => ({id: c.payload.key, ...c.payload.val()})))
      );

    return this.dealers;
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

  getDealer(id: string) {
    return this.db.object<Dealer>(`dealers/${id}`)
      .valueChanges();
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
