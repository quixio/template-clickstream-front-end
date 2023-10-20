import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { USERS } from './constants/users';
import { User } from './models/user';
import { DataService } from './services/data.service';
import { ConnectionStatus, QuixService } from './services/quix.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] = USERS;
  selectedUser: User;

  constructor(private quixService: QuixService, private dataService: DataService, public media: MediaObserver) {}

  ngOnInit(): void {
    this.selectedUserChanged(USERS[0]);
    this.selectedUser = this.dataService.user;

    this.quixService.readerConnStatusChanged$.subscribe((status) => {
      if (status !== ConnectionStatus.Connected) return;
      this.quixService.subscribeToEvent(this.quixService.offersTopic, this.selectedUser.userId, "*");
    });
  }

  selectedUserChanged(user: User): void {
    this.dataService.user = user;
  }

  toggleSidenav(isOpen: boolean): void {
    this.dataService.isSidenavOpen$.next(isOpen);
  }
}
