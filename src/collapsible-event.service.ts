import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

export class CollapsibleEvent {
    type: string;
}

@Injectable()
export class CollapsibleEventService {
    type: 'accordion' | 'expandable';
    // Observable string sources
    private toggleCollapsibleItemSource = new Subject<any>();

    // Observable string streams
    toggleCollapsibleItem$ = this.toggleCollapsibleItemSource.asObservable();

    // Toggle collapsible item
    toggleCollapsibleItem(event?: CollapsibleEvent) {
        // console.debug('CollapsibleEventService::toggleCollapsibleItem()');
        this.toggleCollapsibleItemSource.next(event);
    }

    unsubscribe() {
        this.toggleCollapsibleItemSource.unsubscribe();
    }
}
