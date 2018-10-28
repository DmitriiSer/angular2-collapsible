import {
    Component,
    AfterContentInit,
    ContentChildren
} from '@angular/core';

import { CollapsibleBodyComponent } from '../collapsible-body/collapsible-body.component';

import { CollapsibleService } from '../services/collapsible.service';
import { CollapsibleEventService } from '../services/collapsible-event.service';

@Component({
    selector: 'collapsible-list-item',
    template: `
        <ng-content select="collapsible-header"></ng-content>
        <ng-content select="collapsible-body"></ng-content>
    `,
    providers: [CollapsibleEventService]
})
export class CollapsibleListItemComponent implements AfterContentInit {

    @ContentChildren(CollapsibleBodyComponent) contentListBodies: Array<CollapsibleBodyComponent>;

    constructor(private collapsibleService: CollapsibleService) { }

    ngAfterContentInit() {
        // store list bodies in 'CollapsibleService'
        this.contentListBodies.forEach((item) => {
            this.collapsibleService.addListBody(item);
        });
    }

}
