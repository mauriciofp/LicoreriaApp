import { Injectable } from '@angular/core';
import {
  OneSignalAppClient,
  NotificationBySegmentBuilder,
  NotificationByDeviceBuilder,
} from 'onesignal-api-client-core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OnesignalApiService {
  private client: OneSignalAppClient;

  private headsForUser = 'Licorcito';

  constructor(private userService: UserService) {
    this.client = new OneSignalAppClient(
      environment.onesignal.appId,
      environment.onesignal.apiKey
    );
  }

  sendNotificationToUser(
    orderId: string,
    onesignalId: string,
    message: string
  ) {
    const input = new NotificationByDeviceBuilder()
      .setIncludePlayerIds([onesignalId])
      .notification() // .email()
      .setHeadings({
        en: this.headsForUser,
        es: this.headsForUser,
      })
      .setContents({ en: message, es: message })
      .setSubtitle({ en: 'El licorcito feliz', es: 'El licorcito feliz' })
      .setAttachments({ data: { orderId } })
      .build();
    return this.client.createNotification(input);
  }
}
