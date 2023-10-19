import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USERS } from 'src/app/constants/users';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userName: string;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private user: User,
  ) {}

  ngOnInit(): void {
    const index = USERS.indexOf(this.user) + 1
    this.userName = `User ${index}`;
  }

  close(): void {
    this.dialogRef.close();
  }
}
