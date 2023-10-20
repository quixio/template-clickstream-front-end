import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, map, of } from 'rxjs';
import { PRODUCTS } from 'src/app/constants/products';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = PRODUCTS;
  categories: string[] = Object.values(Categories).sort();
  formArray = new FormArray<FormControl<boolean>>([]);
  form = new FormGroup ({ categories: this.formArray });
  subscription: Subscription;
  isMainSidenavOpen$: Observable<boolean>;

  constructor(public media: MediaObserver, private dataService: DataService) {}

  ngOnInit(): void {
    this.categories.forEach(() => this.formArray.push(new FormControl()));

    this.subscription = this.formArray.valueChanges
      .pipe(map(((values) => {
        const selectedCategories = this.categories.filter((_, i) => values[i]);
        if (!selectedCategories?.length) return PRODUCTS
        return PRODUCTS.filter((f) => selectedCategories.includes(f.category))
      })))
      .subscribe((products) => this.products = products)

    this.isMainSidenavOpen$ = this.dataService.isSidenavOpen$.asObservable()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
