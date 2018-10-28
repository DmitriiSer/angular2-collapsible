import {
    Component,
    OnInit, AfterContentInit,
    Input, HostBinding, HostListener,
    ElementRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CollapsibleTableRowDetailComponent } from '../collapsible-table-row-detail/collapsible-table-row-detail.component';
import { CollapsibleTableComponent } from '../collapsible-table/collapsible-table.component';
import { CollapsibleService } from '../services/collapsible.service';

@Component({
    selector: 'collapsible-table-row',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: table-row;
            transition-property: background-color, color;
        }
    `],
})
export class CollapsibleTableRowComponent implements OnInit, AfterContentInit {

    private static EASE_OUT_QUAD = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    public static DEFAULT_STRIPED_ODD_ROW_COLOR = 'rgba(242,242,242,0.8)';
    public static DEFAULT_STRIPED_EVEN_ROW_COLOR = 'transparent';
    public static DEFAULT_HIGHLIGHT_ROW_COLOR = 'rgba(222,222,222, 0.8)';
    public static DEFAULT_ACTIVE_ROW_COLOR = 'rgba(212,212,212, 0.8)';
    public static DEFAULT_SELECTED_ROW_COLOR = 'rgba(212,212,212, 0.8)';

    public static DEFAULT_ROW_TEXT_COLOR = 'black';

    @Input() detail: CollapsibleTableRowDetailComponent;

    @HostBinding('style.color') rowTextColor: string;

    @HostBinding('style.background-color') rowBackgroundColor: string;

    @HostBinding('style.transition-duration') backgroundTransitionDuration = '0.3s';
    // transition-timing-function: easeInQuad
    @HostBinding('style.transition-timing-function')
    backgroundTransitionTimingFunction = this.sanitizer
        .bypassSecurityTrustStyle(CollapsibleTableRowComponent.EASE_OUT_QUAD);

    @HostBinding('class.selected') selected: boolean;

    isHeadRow = false;
    isBodyRow = false;
    isOddRow = false;
    isEvenRow = false;
    isParentStriped = false;
    isParentHighlight = false;
    parentAllowsSelect = false;
    parentAllowsSelectMultipleRows = false;

    parentStripedRowBackgroundColor: string;
    parentStripedRowTextColor: string;
    parentHighlightRowBackgroundColor: string;
    parentHighlightRowTextColor: string;
    activeRowBackgroundColor: string;
    activeRowTextColor: string;
    selectedRowBackgroundColor: string;
    selectedRowTextColor: string;
    parentAllowsDeselectingRows = false;

    index: number;

    private parentCollapsibleTable: CollapsibleTableComponent;
    private prevSelectedRows: Array<number>;
    private dragSelection = false;

    constructor(
        private el: ElementRef,
        private sanitizer: DomSanitizer,
        private collapsibleService: CollapsibleService) { }

    ngOnInit() {
        const elem: Element = this.el.nativeElement;
        const tbody: Element = elem.parentElement;
        if (tbody.tagName === 'TBODY') {
            const collapsibleTableRows: NodeListOf<Element> = tbody.querySelectorAll('collapsible-table-row');
            for (let i = 0; i < collapsibleTableRows.length; i++) {
                const collapsibleTableRow: Element = collapsibleTableRows[i];
                if (collapsibleTableRow === elem) {
                    this.index = i + 1;
                    break;
                }
            }
        }

        // retrieve parent CollapsibleTableComponent through the CollapsibleService
        this.parentCollapsibleTable = this.collapsibleService.getCollapsibleTable();

        if (this.parentCollapsibleTable != null) {
            // check if collapsible-table is marked to show striped table
            this.isParentStriped = this.parentCollapsibleTable.striped;

            // check if collapsible-table is marked to highlight current row
            this.isParentHighlight = this.parentCollapsibleTable.highlight;
            this.parentHighlightRowBackgroundColor = this.parentCollapsibleTable.highlightColor ||
                CollapsibleTableRowComponent.DEFAULT_HIGHLIGHT_ROW_COLOR;
            this.parentHighlightRowTextColor = this.parentCollapsibleTable.highlightTextColor ||
                CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;

            // check if collapsible-table specifies the active row color
            this.activeRowBackgroundColor = this.parentCollapsibleTable.activeColor ||
                CollapsibleTableRowComponent.DEFAULT_ACTIVE_ROW_COLOR;
            this.activeRowTextColor = this.parentCollapsibleTable.activeTextColor ||
                CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;

            // check if collapsible-table allows selecting rows
            this.parentAllowsSelect = this.parentCollapsibleTable.select;
            this.parentAllowsSelectMultipleRows = this.parentCollapsibleTable.selectMultipleRows;

            // check if collapsible-table specifies a color for the selected row
            this.selectedRowBackgroundColor = this.parentCollapsibleTable.selectColor ||
                CollapsibleTableRowComponent.DEFAULT_SELECTED_ROW_COLOR;
            this.selectedRowTextColor = this.parentCollapsibleTable.selectTextColor ||
                CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;

            // check if collapsible-table allows to deselect rows
            this.parentAllowsDeselectingRows = this.parentCollapsibleTable.allowDeselectingRows != null ?
                this.parentCollapsibleTable.allowDeselectingRows : false;
        }
    }

    ngAfterContentInit(): void {
        this.updateRow();
    }

    updateRow(): void {
        const elem: Element = this.el.nativeElement;

        // determine if the row is inside the 'thead'
        const th = elem.querySelector('th');
        if (th != null) {
            this.isHeadRow = true;
        }

        // determine if the row is inside the 'tbody'
        const td = elem.querySelector('td');
        if (td != null) {
            this.isBodyRow = true;
            // determine if the row is 'odd' or 'event'
            if (this.index % 2 === 0) {
                this.isEvenRow = true;
                this.parentStripedRowBackgroundColor = this.parentCollapsibleTable.stripedEvenColor ||
                    CollapsibleTableRowComponent.DEFAULT_STRIPED_EVEN_ROW_COLOR;
                this.parentStripedRowTextColor = this.parentCollapsibleTable.stripedEvenTextColor ||
                    CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;
            } else {
                this.isOddRow = true;
                this.parentStripedRowBackgroundColor = this.parentCollapsibleTable.stripedOddColor ||
                    CollapsibleTableRowComponent.DEFAULT_STRIPED_ODD_ROW_COLOR;
                this.parentStripedRowTextColor = this.parentCollapsibleTable.stripedOddTextColor ||
                    CollapsibleTableRowComponent.DEFAULT_ROW_TEXT_COLOR;
            }

            switch (true) {
                case this.parentAllowsSelect && this.selected:
                    this.rowBackgroundColor = this.selectedRowBackgroundColor;
                    this.rowTextColor = this.selectedRowTextColor;
                    break;
                case this.isParentStriped:
                    this.rowBackgroundColor = this.parentStripedRowBackgroundColor;
                    this.rowTextColor = this.parentStripedRowTextColor;
                    break;
            }

        }
    }

    getHeight(): number {
        return this.el.nativeElement.offsetHeight;
    }

    private isLeftMouseButton(event: MouseEvent): boolean {
        const button: number = event.button;
        const which: number = event['which'];
        const target = <HTMLElement>(event.target || event.srcElement || event.currentTarget);

        if (['TR', 'TD'].indexOf(target.tagName) > -1) {
            if ('button' in event) {
                return button === 0;
            } else {
                return (which || button) === 1;
            }
        }

        return false;
    }

    @HostListener('mousedown', ['$event'])
    mousedown(event: MouseEvent) {
        // handle only if the Left mouse button pressed
        // and the row is a body row
        if (this.isLeftMouseButton(event) && this.isBodyRow) {
            if (this.parentCollapsibleTable.noTextSelect) {
                event.preventDefault();
            }
            if (this.isBodyRow) {
                if (this.parentAllowsSelect && !this.parentAllowsDeselectingRows) {
                    this.prevSelectedRows = this.parentCollapsibleTable.selectedRows;
                    this.parentCollapsibleTable.clearSelectedRows();
                    this.parentCollapsibleTable.deselectAllRows();
                }
                this.rowBackgroundColor = this.activeRowBackgroundColor;
                this.rowTextColor = this.activeRowTextColor;
            }
        }
    }

    @HostListener('mouseup', ['$event'])
    mouseup(event: MouseEvent) {
        // handle only if the Left mouse button pressed
        // and the row is a body row
        if (this.isLeftMouseButton(event) && this.isBodyRow) {
            // handle selection
            if (this.parentAllowsSelect) {
                if (!this.parentAllowsDeselectingRows) {
                    this.parentCollapsibleTable.selectRow(this.index);
                } else {
                    if (!this.dragSelection) {
                        this.parentCollapsibleTable.toggleRowSelection(this.index);
                    }
                }
            }

            // check row state
            this.parentCollapsibleTable.updateTable();
            /*switch (true) {
                // parent allows selecting rows and the row is selected
                case this.parentAllowsSelect && this.selected:
                    this.rowBackgroundColor = this.selectedRowBackgroundColor;
                    this.rowTextColor = this.selectedRowTextColor;
                    this.parentCollapsibleTable.updateTable();
                    break;
                // highlighted
                case this.isParentHighlight:
                    this.rowBackgroundColor = this.parentHighlightRowBackgroundColor;
                    this.rowTextColor = this.parentHighlightRowTextColor;
                    break;
                // striped
                case this.isParentStriped:
                    this.rowBackgroundColor = this.parentStripedRowBackgroundColor;
                    this.rowTextColor = this.parentStripedRowTextColor;
                    break;
                default:
                    this.rowBackgroundColor = undefined;
                    this.rowTextColor = undefined;
                    break;
            }*/

            // select multiple rows using the 'Shift' key
            if (this.parentAllowsSelect &&
                this.parentAllowsSelectMultipleRows &&
                event != null && event.shiftKey) {
                if (this.prevSelectedRows != null &&
                    this.prevSelectedRows.length > 0 &&
                    this.parentCollapsibleTable.selectedRows.length > 0) {
                    const rangeSelectedRows = this.prevSelectedRows.concat(this.parentCollapsibleTable.selectedRows);
                    rangeSelectedRows.sort((a, b) => a - b);
                    const firstRowIndex = Math.min.apply(null, rangeSelectedRows);
                    const lastRowIndex = Math.max.apply(null, rangeSelectedRows);

                    this.parentCollapsibleTable.selectRows(firstRowIndex, lastRowIndex);
                }
            }

            // set dragSelection flag to false. Prevents selection drag behavior
            this.dragSelection = false;

            // focus the collapsible table
            this.parentCollapsibleTable.focus();
        }
    }

    @HostListener('mouseenter', ['$event'])
    mouseenter(event: MouseEvent) {
        // handle only if the row is a body row
        if (this.isBodyRow) {
            switch (true) {
                // the use is trying to select multiple rows by holding a mouse button
                case this.parentAllowsSelect && this.parentAllowsSelectMultipleRows && this.parentCollapsibleTable.mouseDownHold:
                    this.parentCollapsibleTable.selectRow(this.index);
                    this.dragSelection = true;
                    break;
                // parent allows selecting rows and the row is selected
                case this.parentAllowsSelect && this.selected:
                    break;
                // highlighted
                case this.isParentHighlight:
                    this.rowBackgroundColor = this.parentHighlightRowBackgroundColor;
                    this.rowTextColor = this.parentHighlightRowTextColor;
                    break;
            }
        }
    }

    @HostListener('mouseleave', ['$event'])
    mouseleave(event: MouseEvent) {
        // handle only if the row is a body row
        if (this.isBodyRow) {
            // check row state
            switch (true) {
                // the use is trying to select multiple rows by holding a mouse button
                case this.parentAllowsSelect && this.parentAllowsSelectMultipleRows && this.parentCollapsibleTable.mouseDownHold:
                    this.parentCollapsibleTable.selectRow(this.index);
                    this.dragSelection = false;
                    break;
                // parent allows selecting rows and the row is selected
                case this.parentAllowsSelect && this.selected:
                    break;
                // stripped
                case this.isParentStriped:
                    this.rowBackgroundColor = this.parentStripedRowBackgroundColor;
                    this.rowTextColor = this.parentStripedRowTextColor;
                    break;
                default:
                    this.rowBackgroundColor = undefined;
                    this.rowTextColor = undefined;
                    break;
            }
        }
    }

    @HostListener('click', ['$event'])
    click(event: MouseEvent) {
        if (this.detail != null) {
            const target = <HTMLElement>(event.target || event.srcElement || event.currentTarget);

            if (target != null && ['TR', 'TD'].indexOf(target.tagName) > -1) {
                this.detail.subject.next();
            }
        }
    }

}
