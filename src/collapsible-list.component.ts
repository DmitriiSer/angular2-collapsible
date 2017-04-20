import {
  Component,
  OnChanges, SimpleChanges,
  Input,
  ContentChildren, QueryList
} from '@angular/core';

import { CollapsibleListItemComponent } from './collapsible-list-item.component';

import { CollapsibleService } from './collapsible.service';

@Component({
  selector: 'collapsible-list',
  template: `<ng-content select="collapsible-list-item"></ng-content>`,
  styles: [`
    :host {
      display: block;
      margin: 0.5rem 0 1rem 0;
      border-top: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-left: 1px solid #ddd;
      box-shadow: 
        0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    .side-nav :host,
    .side-nav.fixed :host {
      border: none;
      box-shadow: none;
    }

    :host(.popout) {
      border: none;
      box-shadow: none;
    }

    :host(.popout) > li {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
      margin: 0 24px;
      transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .side-nav :host {
      margin: 0;
    }
  `],
  providers: [CollapsibleService]
})
export class CollapsibleListComponent implements OnChanges {
  // component options
  //
  // describes the type of the collapsible list: 'accordion' or 'expandable'
  @Input() type: 'accordion' | 'expandable' = 'accordion';

  @ContentChildren(CollapsibleListItemComponent) contentListItems: QueryList<CollapsibleListItemComponent>;

  constructor(private collapsibleService: CollapsibleService) { }

  ngOnChanges(changes: SimpleChanges): void {
    for (let change in changes) {
      if (change === 'type') {
        // console.debug('CollapsibleListComponent::ngOnChanges(), currentValue = ' + changes.type.currentValue);
        this.type = changes.type.currentValue;
        this.collapsibleService.setType(this.type);
      }
    }
  }
}
