import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CollapsibleTableRowDetailComponent } from './collapsible-table-row-detail.component';
import { CollapsibleBodyComponent } from '../collapsible-body/collapsible-body.component';
import { CollapsibleListItemComponent } from '../collapsible-list-item/collapsible-list-item.component';
import { CollapsibleService } from '../services/collapsible.service';

describe('CollapsibleTableRowDetailComponent', () => {
  let component: CollapsibleTableRowDetailComponent;
  let fixture: ComponentFixture<CollapsibleTableRowDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        CollapsibleTableRowDetailComponent,
        CollapsibleBodyComponent,
        CollapsibleListItemComponent
      ],
      providers: [CollapsibleService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleTableRowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
