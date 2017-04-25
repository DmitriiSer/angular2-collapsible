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

    private static EASE_OUT_QUAD = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    private static DEFAULT_STRIPED_ODD_ROW_COLOR = 'rgba(242,242,242,0.8)';
    private static DEFAULT_STRIPED_EVEN_ROW_COLOR = 'transparent';
    private static DEFAULT_HIGHLIGHT_ROW_COLOR = 'rgba(222,222,222, 0.8)';
    private static DEFAULT_ACTIVE_ROW_COLOR = 'rgba(212,212,212, 0.8)';
    private static DEFAULT_SELECTED_ROW_COLOR = 'rgba(212,212,212, 0.8)';

    @Input() detail: CollapsibleTableRowDetailComponent;

    @HostBinding('style.background-color') rowColor: string;

    @HostBinding('style.transition-duration') backgroundTransitionDuration = '0.3s';
    // transition-timing-function: easeInQuad
    @HostBinding('style.transition-timing-function')
    backgroundTransitionTimingFunction = this.sanitizer
        .bypassSecurityTrustStyle(CollapsibleTableRowComponent.EASE_OUT_QUAD);

    @HostBinding('attr.selected') selected: boolean;

    isHeadRow = false;
    isBodyRow = false;
    isOddRow = false;
    isEvenRow = false;
    isParentStriped = false;
    parentStripedRowColor: string;
    isParentHighlight = false;
    parentHighlightRowColor: string;
    activeRowColor: string;
    parentAllowsSelect = false;
    parentAllowsSelectMultipleRows = false;
    selectedRowColor: string;

    index: number;

    private parentCollapsibleTable: CollapsibleTableComponent;

    constructor(
        private el: ElementRef,
        private sanitizer: DomSanitizer,
        private collapsibleService: CollapsibleService) { }

    ngOnInit() {
        let elem: Element = this.el.nativeElement;
        let tbody: Element = elem.parentElement;
        if (tbody.tagName === 'TBODY') {
            // console.debug(elem);
            let collapsibleTableRows: NodeListOf<Element> = tbody.querySelectorAll('collapsible-table-row');
            for (let i = 0; i < collapsibleTableRows.length; i++) {
                let collapsibleTableRow: Element = collapsibleTableRows[i];
                if (collapsibleTableRow === elem) {
                    this.index = i + 1;
                    break;
                }
            }
        }

        // retrieve parent CollapsibleTableComponent through the CollapsibleService
        this.parentCollapsibleTable = this.collapsibleService.getCollapsibleTable();

        // check if collapsible-table is marked to show striped table
        this.isParentStriped = this.parentCollapsibleTable.striped;

        // check if collapsible-table is marked to highlight current row
        this.isParentHighlight = this.parentCollapsibleTable.highlight;
        this.parentHighlightRowColor = (this.parentCollapsibleTable.highlightColor != null &&
            this.parentCollapsibleTable.highlightColor !== '') ?
            this.parentCollapsibleTable.highlightColor :
            CollapsibleTableRowComponent.DEFAULT_HIGHLIGHT_ROW_COLOR;

        // check if collapsible-table specifies the active row color
        this.activeRowColor = (this.parentCollapsibleTable.activeColor != null &&
            this.parentCollapsibleTable.activeColor !== '') ?
            this.parentCollapsibleTable.activeColor :
            CollapsibleTableRowComponent.DEFAULT_ACTIVE_ROW_COLOR;
        // check if collapsible-table allows selecting rows
        this.parentAllowsSelect = this.parentCollapsibleTable.select;
        this.parentAllowsSelectMultipleRows = this.parentCollapsibleTable.selectMultipleRows;

        this.selectedRowColor = (this.parentCollapsibleTable.selectColor != null &&
            this.parentCollapsibleTable.selectColor !== '') ?
            this.parentCollapsibleTable.selectColor :
            CollapsibleTableRowComponent.DEFAULT_SELECTED_ROW_COLOR;
    }

    ngAfterContentInit(): void {
        // console.debug(`CollapsibleTableRowComponent::ngAfterContentInit()`);
        this.updateRow();
    }

    updateRow(): void {
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
            if (this.index % 2 === 0) {
                this.isEvenRow = true;
                this.parentStripedRowColor = (this.parentCollapsibleTable.stripedEvenColor != null &&
                    this.parentCollapsibleTable.stripedEvenColor !== '') ?
                    this.parentCollapsibleTable.stripedEvenColor :
                    CollapsibleTableRowComponent.DEFAULT_STRIPED_EVEN_ROW_COLOR;
            } else {
                this.isOddRow = true;
                this.parentStripedRowColor = (this.parentCollapsibleTable.stripedOddColor != null &&
                    this.parentCollapsibleTable.stripedOddColor !== '') ?
                    this.parentCollapsibleTable.stripedOddColor :
                    CollapsibleTableRowComponent.DEFAULT_STRIPED_ODD_ROW_COLOR;
            }

            switch (true) {
                case this.parentAllowsSelect && this.selected:
                    this.rowColor = this.selectedRowColor;
                    break;
                case this.isParentStriped:
                    this.rowColor = this.parentStripedRowColor;
                    break;
            }

        }
    }

    getHeight(): number {
        return this.el.nativeElement.offsetHeight;
    }

    @HostListener('mousedown')
    mousedown() {
        // console.debug('mousedown');
        if (this.isBodyRow) {
            this.rowColor = this.activeRowColor;
        }
    }

    @HostListener('mouseup', ['$event'])
    mouseup(event?: MouseEvent) {
        // console.debug(`mouseup`);
        if (this.isBodyRow) {
            if (this.parentAllowsSelect) {
                if (!this.selected) {
                    this.parentCollapsibleTable.addSelectedRow(this.index);
                } else {
                    this.parentCollapsibleTable.removeSelectedRow(this.index);
                }
                this.selected = !this.selected;
            }

            // check row state
            switch (true) {
                // parent allows selecting rows and the row is selected
                case this.parentAllowsSelect && this.selected:
                    this.rowColor = this.selectedRowColor;
                    break;
                // highlighted
                case this.isParentHighlight:
                    this.rowColor = this.parentHighlightRowColor;
                    break;
                // striped
                case this.isParentStriped:
                    this.rowColor = this.parentStripedRowColor;
                    break;
                default:
                    this.rowColor = undefined;
                    break;
            }

            // select multiple rows using the 'Shift' key
            if (this.parentAllowsSelectMultipleRows && event != null && event.shiftKey) {
                let selectedRowsCount = this.parentCollapsibleTable.selectedRows.length;
                if (selectedRowsCount > 1) {
                    let firstRowIndex = this.parentCollapsibleTable.selectedRows[0];
                    let lastRowIndex = this.parentCollapsibleTable.selectedRows[this.parentCollapsibleTable.selectedRows.length - 1];
                    this.parentCollapsibleTable.selectRows(firstRowIndex, lastRowIndex);
                }
            }

        }
    }

    @HostListener('mouseenter')
    mouseenter() {
        // console.debug(`mouseenter`);
        if (this.isBodyRow) {
            switch (true) {
                // parent allows selecting rows and the row is selected
                case this.parentAllowsSelect && this.selected:
                    break;
                // highlighted
                case this.isParentHighlight:
                    this.rowColor = this.parentHighlightRowColor;
                    break;
            }
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        // console.debug('mouseleave');
        if (this.isBodyRow) {
            // check row state
            switch (true) {
                // the use is trying to select multiple rows by holding a mouse button
                case this.parentAllowsSelectMultipleRows && this.parentCollapsibleTable.mouseDownHold:
                    this.mouseup();
                    this.updateRow();
                    break;
                // parent allows selecting rows and the row is selected
                case this.parentAllowsSelect && this.selected:
                    break;
                // highlighted and stripped
                case this.isParentHighlight && this.isParentStriped:
                    this.rowColor = this.parentStripedRowColor;
                    break;
                default:
                    this.rowColor = undefined;
                    break;
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
