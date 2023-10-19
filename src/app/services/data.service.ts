import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: User;
  userIp: string;

  constructor(private http: HttpClient) {
    this.getIpAddress();
  }

  getIpAddress(): void {
    this.http.get("http://api.ipify.org/?format=json").pipe(map((m: any) => m.ip)).subscribe((ip) => {
      this.userIp = ip;
    });
  }
}
