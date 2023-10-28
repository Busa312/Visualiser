import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/sorting/container/container.component';
import { BarComponent } from './components/sorting/bar/bar.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { PathFindingComponent } from './components/path-finding/path-finding.component';
import { CellComponent } from './components/path-finding/cell/cell.component';
import { BoardComponent } from './components/path-finding/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BarComponent,
    SortingComponent,
    PathFindingComponent,
    CellComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
