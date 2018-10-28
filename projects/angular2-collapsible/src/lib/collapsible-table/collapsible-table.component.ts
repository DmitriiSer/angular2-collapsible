import {
    Component,
    OnInit, OnChanges, SimpleChanges, AfterContentInit,
    Input, HostBinding, HostListener,
    ElementRef, ContentChildren
} from '@angular/core';

import { CollapsibleTableRowComponent } from '../collapsible-table-row/collapsible-table-row.component';
import { CollapsibleService } from '../services/collapsible.service';

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

        :host /deep/ tbody /deep/ collapsible-table-row {
            cursor: pointer;
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

    @ContentChildren(CollapsibleTableRowComponent) collapsibleTableRows: Array<CollapsibleTableRowComponent>;

    mouseDownHold = false;

    constructor(
        private el: ElementRef,
        private collapsibleService: CollapsibleService) { }

    ngOnInit() {
    }

    ngAfterContentInit() {
        // this.updateFixedTableHeight();
        /*
        LOG(`CollapsibleTableComponent::ngOnInit()\n` +
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

    ngOnChanges(changes: SimpleChanges): void {
        for (const change in changes) {
            if (changes.hasOwnProperty(change)) {
                if (this.collapsibleTableRows != null) {
                    switch (change) {
                        case 'striped':
                        case 'stripedOddColor':
                        case 'stripedOddTextColor':
                        case 'stripedEvenColor':
                        case 'stripedEvenTextColor':
                            this.updateTable('striped');
                            break;
                        case 'highlight':
                        case 'highlightColor':
                        case 'highlightTextColor':
                            this.updateTable('highlight');
                            break;
                        case 'activeColor':
                        case 'activeTextColor':
                            this.updateTable('active');
                            break;
                        case 'select':
                        case 'selectColor':
                        case 'selectTextColor':
                        case 'selectMultipleRows':
                        case 'allowDeselectingRows':
                            this.updateTable('select');
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
        if (this.select) {
            switch (true) {
                case index === 0:
                    this.selectRow(1);
                    break;
                case index === this.collapsibleTableRows.length:
                    this.selectRow(this.collapsibleTableRows.length - 1);
                    break;
                case 0 < index && index <= this.collapsibleTableRows.length - 1:
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
                    break;
            }
        }

    }

    selectRows(firstRowIndex: number, lastRowIndex: number) {
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
        let rowHeights = 0;
        if (this.collapsibleTableRowComponent != null) {
            this.collapsibleTableRowComponent.forEach(row => {
            });
        }
    }*/

    updateStriped(row: CollapsibleTableRowComponent): void {
        if (this.striped && row.isBodyRow) {
            row.isParentStriped = true;
            if (row.isOddRow) {
                row.parentStripedRowBackgroundColor = this.stripedOddColor || CollapsibleTableRowComponent.DEFAULT_STRIPED_ODD_ROW_COLOR;
                row.parentStripedRowTextColor = this.stripedOddTextColor || CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;
                row.rowBackgroundColor = row.parentStripedRowBackgroundColor;
                row.rowTextColor = row.parentStripedRowTextColor;
            } else {
                row.parentStripedRowBackgroundColor = this.stripedEvenColor || CollapsibleTableRowComponent.DEFAULT_STRIPED_EVEN_ROW_COLOR;
                row.parentStripedRowTextColor = this.stripedEvenTextColor || CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;
                row.rowBackgroundColor = row.parentStripedRowBackgroundColor;
                row.rowTextColor = row.parentStripedRowTextColor;
            }
        } else {
            row.isParentStriped = false;
            row.rowBackgroundColor = undefined;
            row.rowTextColor = undefined;
        }
    }

    updateHighlight(row: CollapsibleTableRowComponent): void {
        row.isParentHighlight = this.highlight;
        row.parentHighlightRowBackgroundColor = this.highlightColor || CollapsibleTableRowComponent.DEFAULT_HIGHLIGHT_ROW_COLOR;
        row.parentHighlightRowTextColor = this.highlightTextColor || CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;
    }

    updateActive(row: CollapsibleTableRowComponent): void {
        row.activeRowBackgroundColor = this.activeColor || CollapsibleTableRowComponent.DEFAULT_ACTIVE_ROW_COLOR;
        row.activeRowTextColor = this.activeTextColor || CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;
    }

    updateSelect(row: CollapsibleTableRowComponent): void {
        row.parentAllowsSelect = this.select;
        row.parentAllowsSelectMultipleRows = this.selectMultipleRows;
        row.parentAllowsDeselectingRows = this.allowDeselectingRows;
        if (row.selected) {
            row.selectedRowBackgroundColor = this.selectColor || CollapsibleTableRowComponent.DEFAULT_SELECTED_ROW_COLOR;
            row.selectedRowTextColor = this.selectTextColor || CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;
            row.rowBackgroundColor = row.selectedRowBackgroundColor;
            row.rowTextColor = row.selectedRowTextColor;
        }
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
                    case 'active':
                        this.collapsibleTableRows.forEach(row => { this.updateActive(row); });
                        break;
                    case 'select':
                        this.collapsibleTableRows.forEach(row => { this.updateSelect(row); });
                        break;
                }
            } else {
                // propagate changes to each of the CollapsibleTableRowComponent children
                this.collapsibleTableRows.forEach(row => {
                    this.updateStriped(row);
                    this.updateHighlight(row);
                    this.updateSelect(row);
                    this.updateActive(row);
                });
            }
        }
    }

    @HostListener('keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        // select a row only if 'select' property is set to 'true'
        if (this.select && this.allowKeyboardNavigation) {
            enum Key {
                arrowUp = 38,
                arrowDown = 40,
                home = 36,
                end = 35
            }

            let index = 1;
            const whichKey = event['which'];
            if (Key[whichKey] != null) {

                event.preventDefault();
                event.stopPropagation();

                switch (whichKey) {
                    case Key.arrowUp:
                        // select previous row
                        if (this.selectedRows.length > 0) {
                            index = this.selectedRows[this.selectedRows.length - 1];
                            index--;
                        }
                        break;
                    case Key.arrowDown:
                        // select next row
                        if (this.selectedRows.length > 0) {
                            index = this.selectedRows[this.selectedRows.length - 1];
                            index++;
                        }
                        break;
                    case Key.home:
                        index = 1;
                        break;
                    case Key.end:
                        index = this.collapsibleTableRows.length - 1;
                        break;
                }

                this.clearSelectedRows();
                this.deselectAllRows();
                this.selectRow(index);
                this.updateTable();
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
