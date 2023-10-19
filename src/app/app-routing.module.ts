import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductHomeComponent } from './pages/product-home/product-home.component';

const routes: Routes = [
  {
    path: '', component: ProductHomeComponent, children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
