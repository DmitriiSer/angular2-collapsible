import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

import { CollapsibleTableRowDetailComponent } from './collapsible-table-row-detail.component';
import { CollapsibleService } from './collapsible.service';
import { CollapsibleAnimations } from './collapsible-animations.service';

@Component({
    selector: 'collapsible-table-row',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: table-row;
            cursor: pointer;
        }
    `],
    animations: CollapsibleAnimations.collapsibleTableRowAnimations('collapsibleTableRowState')
})
export class CollapsibleTableRowComponent implements OnInit {
    @Input() detail: CollapsibleTableRowDetailComponent;

    @HostBinding('@collapsibleTableRowState')
    activeState: string;

    constructor(private collapsibleService: CollapsibleService) { }

    ngOnInit() { }

    @HostListener('mousedown', ['$event'])
    mousedown(event: MouseEvent) {
        let target: Element = <Element>event.target || <Element>event.currentTarget || event.srcElement;
        if (target.tagName !== 'TH') {
            this.activeState = 'active';
        }
        // console.debug(`mousedown, activeState = ${this.activeState}`);
    }

    @HostListener('mouseup')
    mouseup() {
        this.activeState = 'inactive';
        // console.debug(`mouseup, activeState = ${this.activeState}`);
    }

    @HostListener('click')
    click() {
        if (this.detail != null) {
            this.detail.subject.next();
        }
    }

}
