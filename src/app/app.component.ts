import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { USERS } from './constants/users';
import { User } from './models/user';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = environment.API_KEY || 'DEF_A';
  users: User[] = USERS;
  selectedUser: User;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.selectedUserChanged(USERS[0]);
  }

  selectedUserChanged(user: User): void {
    this.selectedUser = user;
    this.dataService.user = user;
  }
}
