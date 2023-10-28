import {Component, Input} from '@angular/core';
import {Mode, Point} from "../enums";
import {BehaviorSubject} from "rxjs";

interface PointWithCoords {
  row: number;
  col: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() twoDArray: Point[][] = [];
  mode = new BehaviorSubject<Mode>(Mode.startPoint);
  canModify = new BehaviorSubject(true);

  onPointClick(point: {row: number, col: number}){
    if(this.mode.value === Mode.startPoint) {
      for(let i = 0; i < this.twoDArray.length; i++) {
        for(let j = 0; j < this.twoDArray[i].length; j++){
          if(this.twoDArray[i][j] === Point.start){
            this.twoDArray[i][j] = Point.empty;
          }
        }
      }
    }
    if(this.mode.value === Mode.endPoint) {
      for(let i = 0; i < this.twoDArray.length; i++) {
        for(let j = 0; j < this.twoDArray[i].length; j++){
          if(this.twoDArray[i][j] === Point.end){
            this.twoDArray[i][j] = Point.empty;
          }
        }
      }
    }
    this.twoDArray[point.row][point.col] = this.mode.value === Mode.startPoint? Point.start : this.mode.value === Mode.endPoint? Point.end : Point.wall;
  }

  generateLabyrinth(matrix: Point[][]) {
    this.canModify.next(false);
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    const visited = Array.from({ length: rowCount }, () =>
      Array.from({ length: colCount }, () => false)
    );

    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }, // Right
    ];

    let startRow, startCol;
    let endRow, endCol;

    do {
      startRow = Math.floor(Math.random() * rowCount);
      startCol = Math.floor(Math.random() * colCount);
    } while (isSurroundedByWalls(startRow, startCol));

    matrix[startRow][startCol] = Point.start;
    visited[startRow][startCol] = true;

    const stack = [{ row: startRow, col: startCol }];

    while (stack.length > 0) {
      const current = stack.pop();
      const { row, col } = current || {row: 0, col: 0};

      const shuffleDirections = directions.sort(() => Math.random() - 0.5);

      for (const direction of shuffleDirections) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (
          newRow >= 0 &&
          newRow < rowCount &&
          newCol >= 0 &&
          newCol < colCount &&
          !visited[newRow][newCol]
        ) {
          visited[newRow][newCol] = true;
          matrix[newRow][newCol] = Math.random() < 0.2 ? Point.wall : Point.empty;
          stack.push({ row: newRow, col: newCol });
        }
      }
    }

    do {
      endRow = Math.floor(Math.random() * rowCount);
      endCol = Math.floor(Math.random() * colCount);
    } while (
      matrix[endRow][endCol] !== Point.empty ||
      (endRow === startRow && endCol === startCol) ||
      isSurroundedByWalls(endRow, endCol)
      );
    matrix[endRow][endCol] = Point.end;
    this.canModify.next(true);

    function isSurroundedByWalls(row: number, col: number): boolean {
      for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (
          newRow >= 0 &&
          newRow < rowCount &&
          newCol >= 0 &&
          newCol < colCount &&
          matrix[newRow][newCol] !== Point.wall
        ) {
          return false;
        }
      }
      return true;
    }
  }

  findPath(matrix: Point[][]): Point[][] {
    this.canModify.next(false);
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    const visited = Array.from({ length: rowCount }, () =>
      Array.from({ length: colCount }, () => false)
    );
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }, // Right
    ];

    const start = this.findStartPoint(matrix);
    const end = this.findEndPoint(matrix);

    if (!start || !end) {
      throw new Error("Start or end point not found.");
    }

    const queue: PointWithCoords[] = [];
    const prev: (PointWithCoords | undefined)[][] = Array.from({ length: rowCount }, () =>
      Array.from({ length: colCount }, () => undefined)
    );

    queue.push(start);
    visited[start.row][start.col] = true;
    let i = 1;
    while (queue.length > 0) {
      const current = queue.shift();

      if (!current) {
        continue;
      }

      const { row, col } = current;

      if (row === end.row && col === end.col) {
        break;
      }
      for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (
          newRow >= 0 &&
          newRow < rowCount &&
          newCol >= 0 &&
          newCol < colCount &&
          matrix[newRow][newCol] !== Point.wall &&
          !visited[newRow][newCol]
        ) {
          visited[newRow][newCol] = true;
          setTimeout(() => {
            matrix[newRow][newCol] = matrix[newRow][newCol] !== Point.end? Point.path : Point.end;
          }, i*50)
          queue.push({ row: newRow, col: newCol });
          prev[newRow][newCol] = current;
          i++
        }
      }
    }

    let current: PointWithCoords | undefined = end;
    while (current && (current.row !== start.row || current.col !== start.col)) {
      // @ts-ignore
      const { row, col } = current;
      setTimeout(() => {
        matrix[row][col] = matrix[row][col] !== Point.end? Point.finalPath : Point.end;
        if(matrix[row][col] === Point.end) {
          this.canModify.next(true);
        }
      }, i*50);
      current = prev[row][col];
      i++;
    }

    return matrix;
  }

  findStartPoint(matrix: Point[][]): PointWithCoords | undefined {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === Point.start) {
          return { row, col };
        }
      }
    }
    return undefined;
  }

  findEndPoint(matrix: Point[][]): PointWithCoords | undefined {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === Point.end) {
          return { row, col };
        }
      }
    }
    return undefined;
  }


  protected readonly Mode = Mode;
}
