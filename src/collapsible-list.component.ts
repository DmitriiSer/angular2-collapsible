import {
  Component,
  AfterContentInit,
  ContentChildren, QueryList
} from '@angular/core';

import { CollapsibleListItem } from './collapsible-list-item.directive';

@Component({
  selector: 'collapsible-list',
  template: ``,
  styles: [`
    :host {
      background: rgba(0, 0, 0, 0.15);
      border: 1px dashed rgba(0, 0, 0, 0.25);
    }
  `]
})
export class CollapsibleListComponent implements AfterContentInit {
  title = 'collapsible list component';

  @ContentChildren(CollapsibleListItem) items: QueryList<CollapsibleListItem>;

  constructor() { }

  ngAfterContentInit() {


  }
}
