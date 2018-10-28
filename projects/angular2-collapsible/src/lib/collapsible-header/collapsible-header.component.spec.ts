import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleHeaderComponent } from './collapsible-header.component';
import { CollapsibleEventService } from '../services/collapsible-event.service';

describe('CollapsibleHeaderComponent', () => {
  let component: CollapsibleHeaderComponent;
  let fixture: ComponentFixture<CollapsibleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleHeaderComponent],
      providers: [CollapsibleEventService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
