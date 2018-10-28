import { Injectable } from '@angular/core';

import { CollapsibleTableComponent } from '../collapsible-table/collapsible-table.component';
import { CollapsibleHeaderComponent } from '../collapsible-header/collapsible-header.component';
import { CollapsibleBodyComponent } from '../collapsible-body/collapsible-body.component';

@Injectable()
export class CollapsibleService {
    type: 'accordion' | 'expandable';

    collapsibleTable: CollapsibleTableComponent;
    headers: Array<CollapsibleHeaderComponent> = new Array<CollapsibleHeaderComponent>();
    bodies: Array<CollapsibleBodyComponent> = new Array<CollapsibleBodyComponent>();

    getType() {
        return this.type;
    }

    setType(type: 'accordion' | 'expandable') {
        this.type = type;
    }

    getCollapsibleTable(): CollapsibleTableComponent {
        return this.collapsibleTable;
    }

    setCollapsibleTable(table: CollapsibleTableComponent) {
        this.collapsibleTable = table;
    }

    addListHeader(header: CollapsibleHeaderComponent): void {
        this.headers.push(header);
    }

    addListBody(body: CollapsibleBodyComponent): void {
        this.bodies.push(body);
    }

    collapseAll(): void {
        this.bodies.forEach((collapsibleBodyComponent) => {
            // set 'expanded' properties of all the CollapsibleBodyComponents to 'false'
            collapsibleBodyComponent.expanded = false;
            collapsibleBodyComponent.expandedState = collapsibleBodyComponent.expanded.toString();

            // emit 'toggleState' event for all the CollapsibleBodyComponents
            collapsibleBodyComponent.toggleState.emit(false);
        });
    }
}
