import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Scroll-reveal trigger. Driven by RevealDirective.
 *  - hidden       : translateY(30px) -> 0 (fade-up)
 *  - hiddenLeft   : slide in from the left
 *  - hiddenRight  : slide in from the right
 * Child stagger is achieved by giving each child a `delay` param (index * step).
 */
export const fadeUp = trigger('fadeUp', [
  state('hidden', style({ opacity: 0, transform: 'translateY(30px)' })),
  state('hiddenLeft', style({ opacity: 0, transform: 'translateX(-40px)' })),
  state('hiddenRight', style({ opacity: 0, transform: 'translateX(40px)' })),
  state('visible', style({ opacity: 1, transform: 'none' })),
  transition('* => visible', animate(`{{dur}}ms {{delay}}ms ${EASE_OUT}`), {
    params: { delay: 0, dur: 750 }
  })
]);

/** Used on case study cards: staggered enter + soft leave when filters change. */
export const cardPresence = trigger('cardPresence', [
  transition(':enter', [
    // Small shift (14px): the router measures anchor targets while this is in flight.
    style({ opacity: 0, transform: 'translateY(14px)' }),
    animate(`600ms {{delay}}ms ${EASE_OUT}`, style({ opacity: 1, transform: 'none' }))
  ], { params: { delay: 0 } }),
  transition(':leave', [
    animate('220ms ease-in', style({ opacity: 0, transform: 'scale(0.97)' }))
  ])
]);

/** Full-screen mobile menu: panel fade + staggered link entrance. */
export const menuPanel = trigger('menuPanel', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('320ms ease-out', style({ opacity: 1 })),
    query('.menu-item', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      stagger(70, animate(`600ms ${EASE_OUT}`, style({ opacity: 1, transform: 'none' })))
    ], { optional: true })
  ]),
  transition(':leave', [animate('220ms ease-in', style({ opacity: 0 }))])
]);

/** Success / swap panels (form states, tech-stack detail). */
export const swapIn = trigger('swapIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate(`500ms ${EASE_OUT}`, style({ opacity: 1, transform: 'none' }))
  ])
]);

/** Re-plays a fade-up whenever the bound value changes. */
export const detailChange = trigger('detailChange', [
  transition('* => *', [
    style({ opacity: 0, transform: 'translateY(14px)' }),
    animate(`450ms ${EASE_OUT}`, style({ opacity: 1, transform: 'none' }))
  ])
]);

export const REVEAL_ANIMATIONS = [fadeUp];
