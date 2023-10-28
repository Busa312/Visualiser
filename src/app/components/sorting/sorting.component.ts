import { Component } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  array: number[] = [];

  generateRandomNumbers() {
    for (let i = 0; i< 100; i++) {
      this.array[i] = Math.floor(Math.random()*100);
    }
  }
}
