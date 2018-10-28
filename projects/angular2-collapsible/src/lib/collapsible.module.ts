import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleListComponent } from './collapsible-list/collapsible-list.component';
import { CollapsibleListItemComponent } from './collapsible-list-item/collapsible-list-item.component';
import { CollapsibleHeaderComponent } from './collapsible-header/collapsible-header.component';
import { CollapsibleBodyComponent } from './collapsible-body/collapsible-body.component';

import { CollapsibleTableComponent } from './collapsible-table/collapsible-table.component';
import { CollapsibleTableRowComponent } from './collapsible-table-row/collapsible-table-row.component';
import { CollapsibleTableRowDetailComponent } from './collapsible-table-row-detail/collapsible-table-row-detail.component';

import { CollapsibleService } from './services/collapsible.service';
import { CollapsibleEventService } from './services/collapsible-event.service';
import { CollapsibleAnimationsService } from './services/collapsible-animations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CollapsibleListComponent,
    CollapsibleListItemComponent,
    CollapsibleHeaderComponent,
    CollapsibleBodyComponent,
    CollapsibleTableComponent,
    CollapsibleTableRowComponent,
    CollapsibleTableRowDetailComponent
  ],
  exports: [
    CollapsibleListComponent,
    CollapsibleListItemComponent,
    CollapsibleHeaderComponent,
    CollapsibleBodyComponent,
    CollapsibleTableComponent,
    CollapsibleTableRowComponent,
    CollapsibleTableRowDetailComponent
  ],
  providers: [
    CollapsibleService,
    CollapsibleEventService,
    CollapsibleAnimationsService
  ]
})
export class CollapsibleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CollapsibleModule,
      providers: [CollapsibleModule]
    };
  }
}
