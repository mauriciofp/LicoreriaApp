import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserRole } from './models/user.model';
import { AuthService } from './services/auth.service';
import { OnesignalService } from './services/onesignal.service';
import { AppState } from './state/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private onesignalService: OnesignalService
  ) {
    this.authService.initAuthListener();
    this.onesignalService.initialize();
  }

  logout() {
    this.authService.logout().then((res) => this.router.navigate(['auth']));
  }
}
