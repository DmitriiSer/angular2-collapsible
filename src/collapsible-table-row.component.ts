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
})
export class CollapsibleTableRowComponent implements OnInit, AfterContentInit {
    private static rowIndex = 1;
    private static easeOutQuad = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    @Input() detail: CollapsibleTableRowDetailComponent;

    @HostBinding('style.background-color') rowColor: string;

    @HostBinding('style.transition-duration') backgroundTransitionDuration = '0.3s';
    // transition-timing-function: easeInQuad
    @HostBinding('style.transition-timing-function')
    backgroundTransitionTimingFunction = this.sanitizer
        .bypassSecurityTrustStyle(CollapsibleTableRowComponent.easeOutQuad);

    private parentCollapsibleTable: CollapsibleTableComponent;

    isHeadRow = false;
    isBodyRow = false;
    isOddRow = false;
    isEvenRow = false;
    isParentStriped = false;
    parentStripedRowColor: string;
    isParentHighlight = false;
    parentHighlightRowColor: string;
    activeRowColor: string;

    constructor(
        private el: ElementRef,
        private sanitizer: DomSanitizer,
        private collapsibleService: CollapsibleService) { }

    ngOnInit() {        
        // retrieve parent CollapsibleTableComponent through the CollapsibleService
        this.parentCollapsibleTable = this.collapsibleService.getCollapsibleTable();

        // check if collapsible-table is marked to show striped table
        this.isParentStriped = this.parentCollapsibleTable.striped;
        // check if collapsible-table is marked to highlight current row
        this.isParentHighlight = this.parentCollapsibleTable.highlight;
        this.parentHighlightRowColor = this.parentCollapsibleTable.highlightColor;
        // check if collapsible-table specifies the active row color
        this.activeRowColor = this.parentCollapsibleTable.activeColor;
    }

    ngAfterContentInit(): void {
        let elem: Element = this.el.nativeElement;

        // determine if the row is inside the 'thead'
        let th = elem.querySelector('th');
        if (th != null) {
            this.isHeadRow = true;
        }

        // determine if the row is inside the 'tbody'
        let td = elem.querySelector('td');
        if (td != null) {
            this.isBodyRow = true;
            // determine if the row is 'odd' or 'event'
            if (CollapsibleTableRowComponent.rowIndex++ % 2 === 0) {
                this.isEvenRow = true;
                this.parentStripedRowColor = this.parentCollapsibleTable.stripedEvenColor;
            } else {
                this.isOddRow = true;
                this.parentStripedRowColor = this.parentCollapsibleTable.stripedOddColor;
            }

            if (this.isParentStriped) this.rowColor = this.parentStripedRowColor;
        }
    }

    @HostListener('mousedown')
    mousedown() {
        // console.debug('mousedown');
        if (this.isBodyRow) this.rowColor = this.activeRowColor;
    }

    @HostListener('mouseup')
    mouseup() {
        // console.debug('mouseup');
        if (this.isBodyRow) {
            if (this.isParentHighlight) {
                this.rowColor = this.parentHighlightRowColor;
            } else if (this.isParentStriped) {
                this.rowColor = this.parentStripedRowColor;
            } else {
                this.rowColor = undefined;
            }
        }
    }

    @HostListener('mouseenter')
    mouseenter() {
        // console.debug('mouseenter');
        if (this.isBodyRow && this.isParentHighlight) {
            this.rowColor = this.parentHighlightRowColor;
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        // console.debug('mouseleave');
        if (this.isBodyRow && this.isParentHighlight) {
            if (this.isParentStriped) {
                this.rowColor = this.parentStripedRowColor;
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

}
