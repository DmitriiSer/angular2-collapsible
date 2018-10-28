import { Component, HostListener } from '@angular/core';

import { CollapsibleEventService } from '../services/collapsible-event.service';

@Component({
    selector: 'collapsible-header',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: block;
            cursor: pointer;
            min-height: 3rem;
            line-height: 3rem;
            padding: 0 1rem;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
        }
    `]
})
export class CollapsibleHeaderComponent {

    constructor(private eventService: CollapsibleEventService) { }

    @HostListener('click')
    click() {
        this.eventService.toggleCollapsibleItem();
    }

}
