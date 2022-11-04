import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart/cart.page';
import { CartInputComponent } from './components/cart-input/cart-input.component';
import { CartOverviewComponent } from './components/cart-overview/cart-overview.component';



@NgModule({
  declarations: [
    CartPage,
    CartInputComponent,
    CartOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CartPage
  ]
})
export class CartModule { }
