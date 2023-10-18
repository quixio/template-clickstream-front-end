import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { PRODUCTS } from 'src/app/constants/products';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = PRODUCTS;
  categories: Categories[] = Object.values(Categories).sort();
  formArray = new FormArray<FormControl<boolean>>([]);
  form = new FormGroup ({ categories: this.formArray });

  constructor() {}

  ngOnInit(): void {
    this.categories.forEach(() => this.formArray.push(new FormControl()));

    this.formArray.valueChanges.pipe(map(((values) => {
      const selectedCategories = this.categories.filter((_, i) => values[i]);
      if (!selectedCategories?.length) return PRODUCTS
      return PRODUCTS.filter((f) => selectedCategories.includes(f.category))
    }))).subscribe((products) => this.products = products)
  }
}
