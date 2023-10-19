import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: User;
  userIp: string;

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
    });
  }
}
