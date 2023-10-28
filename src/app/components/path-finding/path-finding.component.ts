import {Component, OnInit} from '@angular/core';
import {Point} from "./enums";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-path-finding',
  templateUrl: './path-finding.component.html',
  styleUrls: ['./path-finding.component.scss']
})
export class PathFindingComponent implements OnInit{
  twoDArray = new BehaviorSubject<Point[][]>([]);

  ngOnInit() {
    this.newBoard()
  }

  newBoard() {
    let arr: Point[][] = [];
    for(let i = 0; i < 20; i++){
      let tempArr = [];
      for(let j = 0; j < 20; j++) {
        tempArr.push(Point.empty)
      }
      arr.push(tempArr);
    }
    this.twoDArray.next(arr);
  }
}
