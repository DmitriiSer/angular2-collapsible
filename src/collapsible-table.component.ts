import {
    Component,
    OnInit, OnChanges, SimpleChanges,
    Input, HostBinding, HostListener,
    ElementRef, ContentChildren, QueryList, AfterContentInit
} from '@angular/core';

import { CollapsibleTableRowComponent } from './collapsible-table-row.component';
import { CollapsibleService } from './collapsible.service';

@Component({
    selector: 'collapsible-table',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: table;
            position: relative;
            width: 100%;
            border-collapse: collapse;
        }

        :host thead {
            border-bottom: 1px solid #d0d0d0;
        }        
        
        :host /deep/ collapsible-table-row th,
        :host /deep/ collapsible-table-row td {
            border-radius: 0;
        }

        :host[bordered='true'] {
            border-top: 1px solid #d0d0d0;
            border-right: 1px solid #d0d0d0;
            border-left: 1px solid #d0d0d0;
        }

        :host[bordered='true'] /deep/ collapsible-table-row,
        :host[borderedHorizontally='true'] /deep/ collapsible-table-row {
            border-bottom: 1px solid #d0d0d0;
        }

        :host[bordered='true'] /deep/ collapsible-table-row th,
        :host[bordered='true'] /deep/ collapsible-table-row td,
        :host[borderedVertically='true'] /deep/ collapsible-table-row th:not(:last-child),
        :host[borderedVertically='true'] /deep/ collapsible-table-row td:not(:last-child) {
            border-right: 1px solid #d0d0d0;
        }

        :host(.centered) /deep/ * {
            text-align: center;
        }

        :host(.noTextSelect) /deep/ collapsible-table-row th,
        :host(.noTextSelect) /deep/ collapsible-table-row td {
            user-select: none;
        }        
    `],
    providers: [
        CollapsibleService
    ]
})
export class CollapsibleTableComponent implements OnInit, OnChanges, AfterContentInit {
    // component options
    //
    // makes the table bordered
    @Input()
    @HostBinding('attr.bordered') bordered: boolean;

    // makes the table bordered horizontally only
    @Input()
    @HostBinding('attr.borderedHorizontally') borderedHorizontally: boolean;

    // makes the table bordered vertically only
    @Input()
    @HostBinding('attr.borderedVertically') borderedVertically: boolean;

    // makes the table striped
    @Input()
    @HostBinding('attr.striped') striped: boolean;

    // a color of an odd striped row
    @Input()
    @HostBinding('attr.stripedOddColor') stripedOddColor: string;

    // a text color of an odd striped row
    @Input()
    @HostBinding('attr.stripedOddTextColor') stripedOddTextColor: string;

    // a color of an even striped row
    @Input()
    @HostBinding('attr.stripedEvenColor') stripedEvenColor: string;

    // a text color of an even striped row
    @Input()
    @HostBinding('attr.stripedEvenTextColor') stripedEvenTextColor: string;

    // highlight table rows on mouse hover
    @Input()
    @HostBinding('attr.highlight') highlight: boolean;

    // a color of a highlighted row
    @Input()
    @HostBinding('attr.highlightColor') highlightColor: string;

    // a text color of a highlighted row
    @Input()
    @HostBinding('attr.highlightTextColor') highlightTextColor: string;

    // a color of an active row
    @Input()
    @HostBinding('attr.activeColor') activeColor: string;

    // a text color of an active row
    @Input()
    @HostBinding('attr.activeTextColor') activeTextColor: string;

    // center align all the text in the table
    @Input()
    @HostBinding('class.centered')
    @HostBinding('attr.centered') centered: boolean;

    // makes the table horizontally scrollable on smaller screen widths
    @Input()
    @HostBinding('attr.responsive') responsive: boolean;

    // allows to select rows
    @Input()
    @HostBinding('attr.select') select: boolean;

    // allows to select multiple rows
    @Input()
    @HostBinding('attr.selectMultipleRows') selectMultipleRows: boolean;

    // a color of a selected row
    @Input()
    @HostBinding('attr.selectColor') selectColor: string;

    // a text color of a selected row
    @Input()
    @HostBinding('attr.selectTextColor') selectTextColor: string;

    // allows deselecting selected rows
    @Input()
    @HostBinding('attr.allowDeselectingRows') allowDeselectingRows: boolean;

    // allows navigation between table rows using arrow keys
    @Input()
    @HostBinding('attr.allowKeyboardNavigation')
    allowKeyboardNavigation = true;

    // disables user select withing the table
    @Input()
    @HostBinding('class.noTextSelect')
    @HostBinding('attr.noTextSelect') noTextSelect: boolean;

    fixedTableHeight = 'auto';

    @HostBinding('attr.tabindex') tabindex = 0;

    selectedRows: Array<number> = [];

    // specifies collapsible type. Can be either 'accordion' or 'expandable'
    @Input()
    @HostBinding('attr.type') type: 'accordion' | 'expandable' = 'accordion';

    @ContentChildren(CollapsibleTableRowComponent) collapsibleTableRows: QueryList<CollapsibleTableRowComponent>;

    mouseDownHold = false;

    constructor(
        private el: ElementRef,
        private collapsibleService: CollapsibleService) { }

    ngOnInit() {
        // console.debug(`CollapsibleTableComponent::ngOnInit()`);
        /*
        console.debug(`CollapsibleTableComponent::ngOnInit()\n` +
            `this = {\n` +
            `bordered = ${this.bordered}\n` +
            `borderedHorizontally = ${this.borderedHorizontally}\n` +
            `borderedVertically = ${this.borderedVertically}\n` +
            `striped = ${this.striped}\n` +
            `stripedOddColor = ${this.stripedOddColor}\n` +
            `stripedEvenColor = ${this.stripedEvenColor}\n` +
            `highlight = ${this.highlight}\n` +
            `highlightColor = ${this.highlightColor}\n` +
            `highlightTextColor = ${this.highlightTextColor}\n` +
            `activeColor = ${this.activeColor}\n` +
            `activeTextColor = ${this.activeTextColor}\n` +
            `centered = ${this.centered}\n` +
            `responsive = ${this.responsive}\n` +
            `select = ${this.select}\n` +
            `selectColor = ${this.selectColor}\n` +
            `selectTextColor = ${this.selectTextColor}\n` +
            `selectMultipleRows = ${this.selectMultipleRows}\n` +
            `noTextSelect = ${this.noTextSelect}\n` +
            `}`);
        */
    }

    ngAfterContentInit() {
        // console.debug(`CollapsibleTableComponent::ngAfterContentInit()`);
        // this.updateFixedTableHeight();
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (let change in changes) {
            if (changes.hasOwnProperty(change)) {
                if (this.collapsibleTableRows != null) {
                    switch (change) {
                        case 'striped':
                        case 'stripedOddColor':
                        case 'stripedEvenColor':
                            this.updateTable('striped');
                            break;
                        case 'highlight':
                        case 'highlightColor':
                            this.updateTable('highlight');
                            break;
                        case 'activeColor':
                            this.updateTable('activeColor');
                            break;
                    }
                }

                // update collapsible table type in CollapsibleService
                if (change === 'type') {
                    this.type = changes.type.currentValue;
                    this.collapsibleService.setType(this.type);
                }
            }
        }
        this.collapsibleService.setCollapsibleTable(this);
    }

    focus() {
        this.el.nativeElement.focus();
    }

    addSelectedRow(index: number): void {
        switch (true) {
            case this.selectMultipleRows && this.selectedRows.indexOf(index) === -1:
                this.selectedRows.push(index);
                this.selectedRows.sort((a, b) => a - b);
                break;
            case !this.selectMultipleRows:
                this.selectedRows = [];
                this.deselectAllRows();
                this.selectedRows.push(index);
                this.selectedRows.sort((a, b) => a - b);
                break;
        }
    }

    removeSelectedRow(index: number): void {
        if (this.selectedRows.indexOf(index) !== -1) {
            this.selectedRows.splice(this.selectedRows.indexOf(index), 1);
        }
    }

    clearSelectedRows() {
        this.selectedRows = [];
    }

    deselectAllRows() {
        this.collapsibleTableRows.forEach(row => {
            row.selected = false;
            row.updateRow();
        });
    }

    selectRow(index: number) {
        if (this.select &&
            0 < index && index <= this.collapsibleTableRows.length - 1) {
            // console.debug(`selectRow(${index})`);
            this.addSelectedRow(index);
            this.collapsibleTableRows.forEach((row, i) => {
                if (index !== i) {
                    if (!this.selectMultipleRows) {
                        row.selected = false;
                    }
                } else {
                    row.selected = true;
                }
                row.updateRow();
            });
        }
    }

    selectRows(firstRowIndex: number, lastRowIndex: number) {
        // console.debug(`selectRows(${firstRowIndex}, ${lastRowIndex})`);
        if (this.selectMultipleRows &&
            0 < firstRowIndex && firstRowIndex < lastRowIndex &&
            lastRowIndex <= this.collapsibleTableRows.length - 1) {
            this.clearSelectedRows();
            this.collapsibleTableRows.forEach((row, i) => {
                if (firstRowIndex <= i && i <= lastRowIndex) {
                    this.addSelectedRow(i);
                    row.selected = true;
                } else {
                    row.selected = false;
                }
                row.updateRow();
            });
        }
    }

    toggleRowSelection(index: number) {
        // console.debug(`toggleRowSelection(${index})`);
        if (this.select &&
            0 < index && index <= this.collapsibleTableRows.length - 1) {
            this.collapsibleTableRows.forEach((row, i) => {
                if (index === i) {
                    if (row.selected) {
                        this.removeSelectedRow(index);
                    } else {
                        this.addSelectedRow(index);
                    }
                    row.selected = !row.selected;
                    row.updateRow();
                }
            });
        }
    }

    /*updateFixedTableHeight() {
        this.fixedTableHeight = this.el.nativeElement.offsetHeight + 'px';
        let elem: Element = this.el.nativeElement;
        console.debug(`updateFixedTableHeight(): this.fixedTableHeight = ${this.fixedTableHeight}`);
        let rowHeights = 0;
        if (this.collapsibleTableRowComponent != null) {
            this.collapsibleTableRowComponent.forEach(row => {
                console.debug(row.getHeight());
            });
        }
    }*/

    updateStriped(row: CollapsibleTableRowComponent): void {
        if (this.striped && row.isBodyRow) {
            row.isParentStriped = true;
            if (row.isOddRow) {
                row.parentStripedRowBackgroundColor = this.stripedOddColor;
                row.rowBackgroundColor = this.stripedOddColor;
            } else {
                row.parentStripedRowBackgroundColor = this.stripedEvenColor;
                row.rowBackgroundColor = this.stripedEvenColor;
            }
        } else {
            row.isParentStriped = false;
            row.rowBackgroundColor = undefined;
        }
    }

    updateHighlight(row: CollapsibleTableRowComponent): void {
        row.isParentHighlight = this.highlight;
        row.parentHighlightRowBackgroundColor = this.highlightColor;
    }

    updateActiveColor(row: CollapsibleTableRowComponent): void {
        row.activeRowBackgroundColor = this.activeColor;
    }

    updateTable(change?: string): void {
        if (this.collapsibleTableRows != null) {
            if (change != null) {
                switch (change) {
                    case 'striped':
                        // propagate changes to each of the CollapsibleTableRowComponent children
                        this.collapsibleTableRows.forEach(row => { this.updateStriped(row); });
                        break;
                    case 'highlight':
                        this.collapsibleTableRows.forEach(row => { this.updateHighlight(row); });
                        break;
                    case 'activeColor':
                        this.collapsibleTableRows.forEach(row => { this.updateActiveColor(row); });
                        break;
                }
            } else {
                // propagate changes to each of the CollapsibleTableRowComponent children
                this.collapsibleTableRows.forEach(row => {
                    this.updateStriped(row);
                    this.updateHighlight(row);
                    this.updateActiveColor(row);
                });
            }
        }
    }

    @HostListener('keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        // console.debug(`keydown, ${event.which}`);
        // select a row only if 'select' property is set to 'true'
        if (this.select && this.allowKeyboardNavigation) {
            let key = { arrowUp: 38, arrowDown: 40 };
            let index = 1;
            switch (event.which) {
                case key.arrowUp:
                    event.preventDefault();
                    event.stopPropagation();
                    // select previous row
                    if (this.selectedRows.length > 0) {
                        index = this.selectedRows[this.selectedRows.length - 1];
                        index--;
                    }
                    this.selectRow(index);
                    break;
                case key.arrowDown:
                    event.preventDefault();
                    event.stopPropagation();
                    // select next row
                    if (this.selectedRows.length > 0) {
                        index = this.selectedRows[this.selectedRows.length - 1];
                        index++;
                    }
                    this.selectRow(index);
                    break;
            }
        }
    }

    @HostListener('mousedown')
    mousedown() {
        this.mouseDownHold = true;
    }

    @HostListener('mouseup')
    mouseup() {
        this.mouseDownHold = false;
    }
}
