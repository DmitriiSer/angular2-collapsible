import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleListItemComponent } from './collapsible-list-item.component';
import { CollapsibleService } from '../services/collapsible.service';

describe('CollapsibleListItemComponent', () => {
  let component: CollapsibleListItemComponent;
  let fixture: ComponentFixture<CollapsibleListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleListItemComponent],
      providers: [CollapsibleService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
