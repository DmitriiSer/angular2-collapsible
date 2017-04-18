import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleListComponent } from './src/collapsible-list.component';
import { CollapsibleListItemComponent } from './src/collapsible-list-item.component';
import { CollapsibleHeaderComponent } from './src/collapsible-header.component';
import { CollapsibleBodyComponent } from './src/collapsible-body.component';
import { CollapsibleTableComponent } from './src/collapsible-table.component';
import { CollapsibleTableRowComponent } from './src/collapsible-table-row.component';
import { CollapsibleTableRowDetailComponent } from './src/collapsible-table-row-detail.component';
import { CollapsibleService } from './src/collapsible.service';
import { CollapsibleEventService } from './src/collapsible-event.service';
import { CollapsibleAnimations } from './src/collapsible-animations.service';

export * from './src/collapsible-list.component';
export * from './src/collapsible-list-item.component';
export * from './src/collapsible-header.component';
export * from './src/collapsible-body.component';
export * from './src/collapsible-table.component';
export * from './src/collapsible-table-row.component';
export * from './src/collapsible-table-row-detail.component';
export * from './src/collapsible.service';
export * from './src/collapsible-event.service';
export * from './src/collapsible-animations.service';

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
  ]
})
export class CollapsibleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CollapsibleModule,
      providers: [
        CollapsibleService,
        CollapsibleEventService,
        CollapsibleAnimations
      ]
    };
  }
}
