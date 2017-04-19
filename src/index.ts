import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleListComponent } from './collapsible-list.component';
import { CollapsibleListItemComponent } from './collapsible-list-item.component';
import { CollapsibleHeaderComponent } from './collapsible-header.component';
import { CollapsibleBodyComponent } from './collapsible-body.component';

import { CollapsibleTableComponent } from './collapsible-table.component';
import { CollapsibleTableRowComponent } from './collapsible-table-row.component';
import { CollapsibleTableRowDetailComponent } from './collapsible-table-row-detail.component';

import { CollapsibleService } from './collapsible.service';
import { CollapsibleEventService } from './collapsible-event.service';
import { CollapsibleAnimations } from './collapsible-animations.service';


export * from './collapsible-list.component';
export * from './collapsible-list-item.component';
export * from './collapsible-header.component';
export * from './collapsible-body.component';
export * from './collapsible-table.component';
export * from './collapsible-table-row.component';
export * from './collapsible-table-row-detail.component';
export * from './collapsible.service';
export * from './collapsible-event.service';
export * from './collapsible-animations.service';

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
    CollapsibleAnimations
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
