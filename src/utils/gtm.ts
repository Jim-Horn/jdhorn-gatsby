/** GTM `event` name for Kaprekar calculator primary actions (use `buttonName` to distinguish). */
export const KAPREKAR_BUTTON_CLICK_EVENT = 'kaprekar_button_click' as const;

export type KaprekarButtonName = 'calculate' | 'random';

/**
 * Push to `window.dataLayer` for Google Tag Manager (see gatsby-plugin-google-tagmanager).
 * No-op on SSR; safe if the GTM snippet has not run yet.
 */
export function pushDataLayer(item: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(item);
}

/**
 * Push a named event (and optional fields) to `window.dataLayer` for GTM.
 * Adds `component: 'kaprekar_calculator'` unless overridden in `params`.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  pushDataLayer({
    event: eventName,
    component: 'kaprekar_calculator',
    ...params,
  });
}
