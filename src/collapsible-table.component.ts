import {
    Component,
    OnInit, OnChanges, SimpleChanges,
    Input,
    ElementRef
} from '@angular/core';

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

        :host[bordered] {
            border-top: 1px solid #d0d0d0;
            border-right: 1px solid #d0d0d0;
            border-left: 1px solid #d0d0d0;
        }

        :host thead {
            border-bottom: 1px solid #d0d0d0;
        }        
        
        :host[bordered] /deep/ collapsible-table-row,
        :host[borderedHorizontally] /deep/ collapsible-table-row {
            border-bottom: 1px solid #d0d0d0;
        }

        :host[bordered] /deep/ collapsible-table-row th,
        :host[bordered] /deep/ collapsible-table-row td,
        :host[borderedVertically] /deep/ collapsible-table-row th:not(:last-child),
        :host[borderedVertically] /deep/ collapsible-table-row td:not(:last-child) {
            border-right: 1px solid #d0d0d0;
        }
    `],
    providers: [
        CollapsibleService
    ]
})
export class CollapsibleTableComponent implements OnInit, OnChanges {
    // component parameters
    //
    // makes the table bordered
    @Input() bordered: boolean;
    // makes the table bordered horizontally only
    @Input() borderedHorizontally: boolean;
    // makes the table bordered vertically only
    @Input() borderedVertically: boolean;
    // makes the table striped
    @Input() striped: boolean;
    // a color of a striped row
    @Input() stripedColor: any = '#f2f2f2';
    // highlight table rows on mouse hover
    @Input() highlight: boolean;
    @Input() centered: boolean;
    // makes the table horizontally scrollable on smaller screen widths
    @Input() responsive: boolean;
    // allows to select rows
    @Input() select: boolean;
    // allows to select multiple rows
    @Input() selectMultipleRows: boolean;
    // allows to set selection color
    @Input() selectColor: any = 'rgba(0, 0, 0, 0.2)';
    // disables user select withing the table
    @Input() noTextSelect: boolean;
    // specifies collapsible type. Can be either 'accordion' or 'expandable'
    @Input() type: 'accordion' | 'expandable' = 'accordion';

    constructor(
        private el: ElementRef,
        private collapsibleService: CollapsibleService) { }

    ngOnInit() {
        // update grid view styles and parameters
        this.updateParameters();
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (let change in changes) {
            if (change === 'type') {
                this.type = changes.type.currentValue;
                this.collapsibleService.setType(this.type);
            }
        }
    }

    updateParameters(): void {
        // TODO: check for grid view classes
        // console.debug(this.el.nativeElement.classList);
        // check for grid view attributes
        for (let attribute of this.el.nativeElement.attributes) {
            switch (attribute.nodeName) {
                case 'bordered':
                    // this.el.nativeElement.addClass('bordered');
                    this.bordered = true; break;
                case 'borderedhorizontally': this.borderedHorizontally = true; break;
                case 'borderedvertically': this.borderedVertically = true; break;
                case 'striped': this.striped = true; break;
                case 'highlight': this.highlight = true; break;
                case 'centered': this.centered = true; break;
                case 'responsive': this.responsive = true; break;
                case 'select': this.select = true; break;
                case 'selectmultiplerows': this.selectMultipleRows = true; break;
                case 'notextselect': this.noTextSelect = true; break;
            }
        }

        if (this.bordered) {
            this.borderedHorizontally = true;
            this.borderedVertically = true;
        }
    }
}
