import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleTableRowComponent } from './collapsible-table-row.component';
import { CollapsibleService } from '../services/collapsible.service';

describe('CollapsibleTableRowComponent', () => {
  let component: CollapsibleTableRowComponent;
  let fixture: ComponentFixture<CollapsibleTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleTableRowComponent],
      providers: [CollapsibleService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
