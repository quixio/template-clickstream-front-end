import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, map } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: User;
  userIp: string;
  isSidenavOpen$ = new Subject<boolean>();

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getIpAddress();
  }

  getIpAddress(): void {
    this.http.get("https://api.ipify.org/?format=json").pipe(map((m: any) => m.ip)).subscribe((ip) => {
      this.userIp = ip;
    });
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.user,
      backdropClass: 'bg-transparent'
    });
  }
}
