import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleListComponent } from './src/collapsible-list.component';
import { CollapsibleListItem } from './src/collapsible-list-item.directive';
//import { CollapsibleListService } from './src/collapsible-list.service';

export * from './src/collapsible-list.component';
export * from './src/collapsible-list-item.directive';
//export * from './src/collapsible-list.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CollapsibleListComponent,
    CollapsibleListItem,
  ],
  exports: [
    CollapsibleListComponent,
    CollapsibleListItem,
  ]
})
export class CollapsibleListModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CollapsibleListModule,
      providers: [
        //CollapsibleListService
      ]
    };
  }
}
