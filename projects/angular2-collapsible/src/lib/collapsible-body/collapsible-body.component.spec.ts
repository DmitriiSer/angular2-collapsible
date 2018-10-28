import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CollapsibleBodyComponent } from './collapsible-body.component';
import { CollapsibleService } from '../services/collapsible.service';
import { CollapsibleEventService } from '../services/collapsible-event.service';

describe('CollapsibleBodyComponent', () => {
  let component: CollapsibleBodyComponent;
  let fixture: ComponentFixture<CollapsibleBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [CollapsibleBodyComponent],
      providers: [
        CollapsibleService,
        CollapsibleEventService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
