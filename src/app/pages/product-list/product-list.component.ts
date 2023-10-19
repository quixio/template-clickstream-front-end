import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, map, of } from 'rxjs';
import { PRODUCTS } from 'src/app/constants/products';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';

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

  constructor() {}

  ngOnInit(): void {
    this.categories.forEach(() => this.formArray.push(new FormControl()));

    this.subscription = this.formArray.valueChanges
      .pipe(map(((values) => {
        const selectedCategories = this.categories.filter((_, i) => values[i]);
        if (!selectedCategories?.length) return PRODUCTS
        return PRODUCTS.filter((f) => selectedCategories.includes(f.category))
      })))
      .subscribe((products) => this.products = products)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
