import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPage } from './cart/cart/cart.page';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPage
  },
  {
    path: '**',
    redirectTo: 'cart'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
