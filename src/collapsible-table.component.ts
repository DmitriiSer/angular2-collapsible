import {
    Component,
    OnInit, OnChanges, SimpleChanges,
    Input, HostBinding,
    ContentChildren, QueryList, AfterContentInit
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
    @HostBinding('attr.stripedOddColor') stripedOddColor = '#f2f2f2';

    // a color of an even striped row
    @Input()
    @HostBinding('attr.stripedEvenColor') stripedEvenColor = 'transparent';

    // highlight table rows on mouse hover
    @Input()
    @HostBinding('attr.highlight') highlight: boolean;

    // a color of a highlighted row
    @Input()
    @HostBinding('attr.highlightColor') highlightColor = '#f2f2f2';

    // a color of an active row
    @Input()
    @HostBinding('attr.activeColor') activeColor = '';

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

    // allows to set selection color
    @Input()
    @HostBinding('attr.selectColor') selectColor = 'rgba(0, 0, 0, 0.2)';

    // disables user select withing the table
    @Input()
    @HostBinding('class.noTextSelect')
    @HostBinding('attr.noTextSelect') noTextSelect: boolean;

    // specifies collapsible type. Can be either 'accordion' or 'expandable'
    @Input()
    @HostBinding('attr.type') type: 'accordion' | 'expandable' = 'accordion';

    @ContentChildren(CollapsibleTableRowComponent) collapsibleTableRowComponent: QueryList<CollapsibleTableRowComponent>;

    constructor(private collapsibleService: CollapsibleService) { }

    ngOnInit() {
        // update grid view styles and parameters
        // this.updateParameters();
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
            `activeColor = ${this.activeColor}\n` +
            `centered = ${this.centered}\n` +
            `responsive = ${this.responsive}\n` +
            `select = ${this.select}\n` +
            `selectColor = ${this.selectColor}\n` +
            `selectMultipleRows = ${this.selectMultipleRows}\n` +
            `noTextSelect = ${this.noTextSelect}\n` +
            `}`);
        */
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (let change in changes) {
            if (changes.hasOwnProperty(change)) {
                if (this.collapsibleTableRowComponent != null) {
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
                        /*
                        case 'property':
                            console.debug(`property: ${changes[change].previousValue} => ${changes[change].currentValue}`);
                            break;
                        */
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

    /*
    updateParameters(): void {
        // check for grid view attributes
        for (let attribute of this.el.nativeElement.attributes) {
            switch (attribute.nodeName) {
                case 'bordered': this.bordered = true; break;
                case 'borderedhorizontally': this.borderedHorizontally = true; break;
                case 'borderedvertically': this.borderedVertically = true; break;
                case 'striped': this.striped = true; break;
                case 'stripedoddcolor': this.stripedOddColor = this.el.nativeElement.getAttribute('stripedoddcolor'); break;
                case 'stripedevencolor': this.stripedEvenColor = this.el.nativeElement.getAttribute('stripedevencolor'); break;
                case 'highlight': this.highlight = true; break;
                case 'highlightcolor': this.highlightColor = this.el.nativeElement.getAttribute('highlightcolor'); break;
                case 'activecolor': this.activeColor = this.el.nativeElement.getAttribute('activecolor'); break;
                case 'centered': this.centered = true; break;
                case 'responsive': this.responsive = true; break;
                case 'select': this.select = true; break;
                case 'selectcolor': this.selectColor = this.el.nativeElement.getAttribute('selectcolor'); break;
                case 'selectmultiplerows': this.selectMultipleRows = true; break;
                case 'notextselect': this.noTextSelect = true; break;
            }
        }

        if (this.bordered &&
            (!this.borderedHorizontally || !this.borderedVertically)) {
            this.borderedHorizontally = true;
            this.borderedVertically = true;
        }
    }
    */

    updateStriped(row: CollapsibleTableRowComponent): void {
        if (this.striped && row.isBodyRow) {
            row.isParentStriped = true;
            if (row.isOddRow) {
                row.parentStripedRowColor = this.stripedOddColor;
                row.rowColor = this.stripedOddColor;
            } else {
                row.parentStripedRowColor = this.stripedEvenColor;
                row.rowColor = this.stripedEvenColor;
            }
        } else {
            row.isParentStriped = false;
            row.rowColor = undefined;
        }
    }

    updateHighlight(row: CollapsibleTableRowComponent): void {
        row.isParentHighlight = this.highlight;
        row.parentHighlightRowColor = this.highlightColor;
    }

    updateActiveColor(row: CollapsibleTableRowComponent): void {
        row.activeRowColor = this.activeColor;
    }

    updateTable(change?: string): void {
        if (this.collapsibleTableRowComponent != null) {
            if (change != null) {
                switch (change) {
                    case 'striped':
                        // propagate changes to each of the CollapsibleTableRowComponent children
                        this.collapsibleTableRowComponent.forEach(row => { this.updateStriped(row); });
                        break;
                    case 'highlight':
                        this.collapsibleTableRowComponent.forEach(row => { this.updateHighlight(row); });
                        break;
                    case 'activeColor':
                        this.collapsibleTableRowComponent.forEach(row => { this.updateActiveColor(row); });
                        break;
                }
            } else {
                // propagate changes to each of the CollapsibleTableRowComponent children
                this.collapsibleTableRowComponent.forEach(row => {
                    this.updateStriped(row);
                    this.updateHighlight(row);
                    this.updateActiveColor(row);
                });
            }
        }
    }

    ngAfterContentInit() {
        // console.debug(`CollapsibleTableComponent::ngAfterContentInit()`);
        this.updateTable();
    }
}
