import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-order-chat',
  templateUrl: './order-chat.component.html',
  styleUrls: ['./order-chat.component.scss'],
})
export class OrderChatComponent implements OnInit {
  orderId: string;
  messages: Message[] = [];
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap(({ id }) => (this.orderId = id)),
        switchMap(({ id }) => this.messageService.getMessages(id))
      )
      .subscribe((messages) => (this.messages = messages));
  }
}
