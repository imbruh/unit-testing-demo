import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  /**
   * Soma dois números.
   *
   * @param a O primeiro número a ser somado.
   * @param b O segundo número a ser somado.
   * @returns A soma dos dois números.
   */
  add(a: number, b: number) {
    return a + b;
  }
}
