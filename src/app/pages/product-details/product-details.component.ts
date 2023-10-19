import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PRODUCTS } from 'src/app/constants/products';
import { Product } from 'src/app/models/product';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Data } from 'src/app/models/data';
import { QuixService } from 'src/app/services/quix.service';


@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private quixService: QuixService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.product = PRODUCTS.find((f) => f.id === productId);

    this.quixService.writerConnStatusChanged$.subscribe((_) => {
      if (this.product) this.sendData(this.product);
    });

    setTimeout(() => this.openDialog(), 1000);
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.dataService.user,
    });
  }

  sendData(product: Product): void {
    const payload: Data = {
      timestamps: [new Date().getTime() * 1000000],
      stringValues: {
        'userId': [this.dataService.user.userId],
        'ip': [this.dataService.userIp],
        'userAgent': [navigator.userAgent],
        'productId': [product.id],
        'category': [product.category],
      }
    };
    const topicId = this.quixService.workspaceId + '-' + this.quixService.topicName;
    this.quixService.sendParameterData(topicId, this.dataService.user.userId, payload);
  }
}
