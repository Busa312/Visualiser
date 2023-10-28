import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathFindingComponent } from './path-finding.component';

describe('PathFindingComponent', () => {
  let component: PathFindingComponent;
  let fixture: ComponentFixture<PathFindingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PathFindingComponent]
    });
    fixture = TestBed.createComponent(PathFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
