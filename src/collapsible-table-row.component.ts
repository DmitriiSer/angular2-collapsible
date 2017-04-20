import {
    Component,
    OnInit, AfterContentInit,
    Input, HostBinding, HostListener,
    ElementRef
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { CollapsibleTableRowDetailComponent } from './collapsible-table-row-detail.component';
import { CollapsibleTableComponent } from './collapsible-table.component';
import { CollapsibleService } from './collapsible.service';
// import { CollapsibleAnimationsService } from './collapsible-animations.service';

@Component({
    selector: 'collapsible-table-row',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: table-row;
            cursor: pointer;
            transition-property: background-color;
        }
    `],
    // animations: CollapsibleAnimations.collapsibleTableRowAnimations('collapsibleTableRowState')
})
export class CollapsibleTableRowComponent implements OnInit, AfterContentInit {
    private static rowIndex = 1;
    // private static easeInQuad = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
    private static easeOutQuad = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    @Input() detail: CollapsibleTableRowDetailComponent;

    @HostBinding('style.background-color') rowColor: string;

    @HostBinding('style.transition-duration') backgroundTransitionDuration = '0.4s';
    // transition-timing-function: easeInQuad
    @HostBinding('style.transition-timing-function')
    backgroundTransitionTimingFunction = this.sanitizer
        .bypassSecurityTrustStyle(CollapsibleTableRowComponent.easeOutQuad);

    // @HostBinding('@collapsibleTableRowState') activeState: string;

    private parentCollapsibleTable: CollapsibleTableComponent;

    private headRow = false;
    private bodyRow = false;
    private oddRow = false;
    private evenRow = false;
    private parentStriped = false;
    private stripedRowColor: string;
    private parentHighlight = false;
    private highlightRowColor: string;
    private activeRowColor: string;

    constructor(
        private el: ElementRef,
        private sanitizer: DomSanitizer,
        private collapsibleService: CollapsibleService) { }

    ngOnInit() {
        // retrieve parent CollapsibleTableComponent through the CollapsibleService
        this.parentCollapsibleTable = this.collapsibleService.getCollapsibleTable();

        // check if collapsible-table is marked to show striped table
        this.parentStriped = this.parentCollapsibleTable.striped;
        // check if collapsible-table is marked to highlight current row
        this.parentHighlight = this.parentCollapsibleTable.highlight;
        this.highlightRowColor = this.parentCollapsibleTable.highlightColor;
        // check if collapsible-table specifies the active row color
        this.activeRowColor = this.parentCollapsibleTable.activeColor;
    }

    ngAfterContentInit(): void {
        let elem: Element = this.el.nativeElement;

        // determine if the row is inside the 'thead'
        let th = elem.querySelector('th');
        if (th != null) {
            this.headRow = true;
        }

        // determine if the row is inside the 'tbody'
        let td = elem.querySelector('td');
        if (td != null) {
            this.bodyRow = true;
            // determine if the row is 'odd' or 'event'
            if (CollapsibleTableRowComponent.rowIndex++ % 2 === 0) {
                this.evenRow = true;
                this.stripedRowColor = this.parentCollapsibleTable.stripedEvenColor;
            } else {
                this.oddRow = true;
                this.stripedRowColor = this.parentCollapsibleTable.stripedOddColor;
            }
        }
    }

    @HostListener('mousedown')
    mousedown() {
        // console.debug('mousedown');
        if (this.isBodyRow()) {
            if (this.isParentStriped()) {
                this.rowColor = this.activeRowColor;
            } else {
                this.rowColor = this.activeRowColor;
                // this.activeState = 'active';
            }
        }
    }

    @HostListener('mouseup')
    mouseup() {
        // console.debug('mouseup');
        if (this.isBodyRow()) {
            if (this.isParentHighlight()) {
                this.rowColor = this.getParentHightlightColor();
            } else if (this.isParentStriped()) {
                this.rowColor = this.getParentStripedColor();
            } else {
                this.rowColor = this.activeRowColor;
                // this.activeState = 'inactive';
            }
        }
    }

    @HostListener('mouseenter')
    mouseenter() {
        // console.debug('mouseenter');
        if (this.isBodyRow() && this.isParentHighlight()) {
            this.rowColor = this.getParentHightlightColor();
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        // console.debug('mouseleave');
        if (this.isBodyRow() && this.isParentHighlight()) {
            if (this.isParentStriped()) {
                this.rowColor = this.getParentStripedColor();
            } else {
                this.rowColor = '';
            }
        }
    }

    @HostListener('click')
    click() {
        if (this.detail != null) {
            this.detail.subject.next();
        }
    }

    isParentStriped(): boolean {
        return this.parentStriped;
    }

    isParentHighlight(): boolean {
        return this.parentHighlight;
    }

    getParentStripedColor(): string {
        return this.stripedRowColor;
    }

    getParentHightlightColor(): string {
        return this.highlightRowColor;
    }

    isHeadRow(): boolean {
        return this.headRow;
    }

    isBodyRow(): boolean {
        return this.bodyRow;
    }

    isOddRow(): boolean {
        return this.oddRow;
    }

    isEvenRow(): boolean {
        return this.evenRow;
    }

}
