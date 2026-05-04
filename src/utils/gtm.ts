/**
 * dataLayer `event` value (GTM custom event name).
 * Emitted after a **valid** Calculate/Enter submit, or when **Random** is used;
 * distinguish with `buttonName` (`trackKaprekarButtonClick`).
 */
export const KAPREKAR_INTERACTION_EVENT = 'kaprekar_button_click' as const;

/** dataLayer `component` for Kaprekar calculator pushes. */
export const KAPREKAR_COMPONENT = 'kaprekar_calculator' as const;

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
 * Generic dataLayer push: `event` is always `eventName` (callers cannot override via `params`).
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  const { event: _ignored, ...rest } = params;
  pushDataLayer({ ...rest, event: eventName });
}

/** Kaprekar calculator: one GTM event + typed `buttonName` + fixed `component`. */
export function trackKaprekarButtonClick(buttonName: KaprekarButtonName): void {
  pushDataLayer({
    event: KAPREKAR_INTERACTION_EVENT,
    component: KAPREKAR_COMPONENT,
    buttonName,
  });
}
