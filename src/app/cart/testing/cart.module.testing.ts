import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

const modules = [
  CommonModule,
  FormsModule
]

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class CartTestingModule { }
