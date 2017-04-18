import { Injectable } from '@angular/core';

import { AnimationTriggerMetadata, trigger, state, style, transition, animate } from '@angular/animations';

@Injectable()
export class CollapsibleAnimations {

    static collapsibleBodyAnimationDuration = '0.2s';
    static easeInQuad = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
    static easeOutQuad = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    static collapsibleTableRowAnimationDuration = '0.2s';

    static collapsibleBodyAnimations(triggerName: string): AnimationTriggerMetadata[] {
        return [
            trigger(triggerName, [
                state('*', style({
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    borderBottom: 'none',
                    overflow: 'hidden'
                })),
                state('true', style({})),
                transition('* => true',
                    animate(CollapsibleAnimations.collapsibleBodyAnimationDuration + ' ' +
                        CollapsibleAnimations.easeInQuad)),
                transition('* => false',
                    animate(CollapsibleAnimations.collapsibleBodyAnimationDuration + ' ' +
                        CollapsibleAnimations.easeOutQuad))
            ])
        ];
    }

    static collapsibleTableRowAnimations(triggerName: string): AnimationTriggerMetadata[] {
        return [
            trigger(triggerName, [
                state('active', style({
                    backgroundColor: 'rgba(0, 0, 0, 0.15)'
                })),
                state('inactive', style({
                    backgroundColor: 'transparent'
                })),
                transition('* => active',
                    animate(CollapsibleAnimations.collapsibleTableRowAnimationDuration + ' ' +
                        CollapsibleAnimations.easeOutQuad)),
                transition('* => inactive',
                    animate(CollapsibleAnimations.collapsibleTableRowAnimationDuration + ' ' +
                        CollapsibleAnimations.easeOutQuad))
            ])
        ];
    }
}
