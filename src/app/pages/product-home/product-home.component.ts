import { Subscription } from 'rxjs';
import { QuixService } from 'src/app/services/quix.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit, OnDestroy {
  subscription: Subscription

  constructor(private quixService: QuixService, private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.quixService.eventDataReceived.subscribe(() => {
      this.dataService.openDialog()
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
