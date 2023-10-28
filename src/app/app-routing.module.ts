import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SortingComponent} from "./components/sorting/sorting.component";
import {PathFindingComponent} from "./components/path-finding/path-finding.component";

const routes: Routes = [
  {
    path: 'sort',
    component: SortingComponent
  },
  {
    path: 'path-finding',
    component: PathFindingComponent
  },
  {
    path: '',
    redirectTo: 'sort',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
