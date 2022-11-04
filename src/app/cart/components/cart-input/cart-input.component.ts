import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart-input',
  templateUrl: './cart-input.component.html',
  styleUrls: ['./cart-input.component.scss']
})
export class CartInputComponent implements OnDestroy {
  private _destroyed$ = new Subject<void>();
  private _inputDebouncer$ = new Subject<string>();
  private debouncedInput$ = this._inputDebouncer$.pipe(debounceTime(300));

  private _inputText: string = '';
  set inputText(newText: string) {
    if (newText !== this._inputText) {
      this._inputText = newText;
      this._inputDebouncer$.next(newText);
    }
  }
  get inputText(): string {
    return this._inputText;
  }

  @Output() readonly inputChange = new EventEmitter<string>();

  constructor() {
    this.debouncedInput$.pipe(takeUntil(this._destroyed$)).subscribe(input => this.inputChange.emit(input));
  }


  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  loadExample(nr: number) {
    switch (nr) {
      case 1:
        this.inputText = `
        1 book at 12.49
        1 music CD at 14.99
        1 chocolate bar at 0.85`;
        break;
      case 2:
        this.inputText = `
        1 imported box of chocolates at 10.00
        1 imported bottle of perfume at 47.50`;
        break;
      case 3:
        this.inputText = `
        1 imported bottle of perfume at 27.99
        1 bottle of perfume at 18.99
        1 packet of headache pills at 9.75
        1 box of imported chocolates at 11.25`;
        break;
      default:
        this.inputText = '';
    }
  }
}
