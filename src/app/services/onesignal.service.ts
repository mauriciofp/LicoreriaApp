import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class OnesignalService {
  private pushId;

  constructor(
    private oneSignal: OneSignal,
    private router: Router,
    private _ngZone: NgZone,
    private platform: Platform
  ) {}

  initialize() {
    this.oneSignal.startInit(
      '79f8f686-4a3d-4321-9275-91342d4aa20d',
      '405383394698'
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe((notification) => {
      console.log('Recivido', notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe((push) => {
      console.log('Abierto', push);
      // this._ngZone.run(() =>
      //   this.router.navigate([
      //     'tabs/orders',
      //     push.notification.payload.additionalData.orderId,
      //   ])
      // );
    });

    this.oneSignal.getIds().then((info) => {
      this.pushId = info.userId;
      console.log(this.pushId);
      // localStorage.setItem('pushId', this.pushId);
    });

    this.oneSignal.endInit();
  }

  getPushId() {
    return this.oneSignal.getIds();
  }

  isCordova() {
    return this.platform.is('cordova');
  }
}
