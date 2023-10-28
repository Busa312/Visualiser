import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, timeout} from "rxjs";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @Input() arr: number[] = [];
  isSorted = new BehaviorSubject(false);

  revert() {
    for (let i = 0; i< Math.floor(this.arr.length/2); i++) {
      setTimeout(() => {
        let temp = this.arr[i];
        this.arr[i] = this.arr[this.arr.length-i-1];
        this.arr[this.arr.length-i-1] = temp;
      },10*(i+1));
    }
  }
  //merge sort:
  mergeSort() {
    this.mergeSortHelper(0, this.arr.length - 1, 99);
  }

  mergeSortHelper(start: number, end: number, step: number) {
    if (start >= end) {
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.mergeSortHelper(start, mid, step - 1);
    this.mergeSortHelper(mid + 1, end, step - 1);
    setTimeout(() => {
      this.merge(start, mid, end);
    }, (end - start) * 50);
  }

  merge(start : number, mid : number, end : number) {
    const left = this.arr.slice(start, mid + 1);
    const right = this.arr.slice(mid + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        this.arr[k] = left[i];
        i++;
      } else {
        this.arr[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < left.length) {
      this.arr[k] = left[i];
      i++;
      k++;
    }

    while (j < right.length) {
      this.arr[k] = right[j];
      j++;
      k++;
    }
  }

  // quicksort:
  quickSortHelper() {
    this.quickSort(0, this.arr.length-1, 100)
  }

  quickSort(low: number, high: number, delay: number) {
    if (low < high) {
      const pivotIndex = this.partition(low, high, delay);

      setTimeout(() => {
        this.quickSort( low, pivotIndex - 1, delay);
        this.quickSort( pivotIndex + 1, high, delay);
      }, delay);
    }
  }

 partition( low: number, high: number, delay: number) {
    const pivot = this.arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (this.arr[j] < pivot) {
        i++;
        this.swap( i, j);
      }
    }

   this.swap( i+1, high);

    return i + 1;
  }
  swap( i: number, j: number) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }
  //selection Sort:
  selectionSort() {
    const n = this.arr.length;

    for (let i = 0; i < n - 1; i++) {
      setTimeout(() => {
      let minIndex = i;

      let j = 0;
      for (j = i + 1; j < n; j++) {
        if (this.arr[j] < this.arr[minIndex]) {
          minIndex = j;
        }
      }
        this.swap(i, minIndex);
      },  100*i);
    }
  }

}
