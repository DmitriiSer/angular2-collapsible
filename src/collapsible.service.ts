import { Injectable } from '@angular/core';

import { CollapsibleHeaderComponent } from './collapsible-header.component';
import { CollapsibleBodyComponent } from './collapsible-body.component';

@Injectable()
export class CollapsibleService {
    type: 'accordion' | 'expandable';

    headers: Array<CollapsibleHeaderComponent> = new Array<CollapsibleHeaderComponent>();
    bodies: Array<CollapsibleBodyComponent> = new Array<CollapsibleBodyComponent>();

    getType() {
        return this.type;
    }

    setType(type: 'accordion' | 'expandable') {
        this.type = type;
    }

    addListHeader(header: CollapsibleHeaderComponent): void {
        this.headers.push(header);
    }

    addListBody(body: CollapsibleBodyComponent): void {
        this.bodies.push(body);
    }

    collapseAll(): void {
        this.bodies.forEach((item) => {
            item.expanded = false;
            item.expandedState = item.expanded.toString();
        });
    }
}
