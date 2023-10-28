import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Mode, Point} from "../enums";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() point: Point = Point.empty;
  @Input() row: number = 0;
  @Input() col: number = 0;
  @Output() clicked =new EventEmitter<{row: number, col: number}>();

  onClick() {
    this.clicked.emit({row: this.row, col: this.col});
  }

  protected readonly Point = Point;
}
