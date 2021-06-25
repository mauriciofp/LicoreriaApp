import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dealer } from '../models/dealer';


@Injectable({
  providedIn: 'root'
})
export class DealerService {

  dealers$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.dealers$ = this.db.list<Dealer>('dealers').snapshotChanges();
  }

  createDealer(dealer: any) {
    return this.db.list('dealers/').push(dealer);
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
}
