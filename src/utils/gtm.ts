/**
 * GTM / dataLayer helpers.
 *
 * Kaprekar uses one custom event, {@link KAPREKAR_INTERACTION_EVENT}. If your container
 * still listens for `kaprekar_calculator_random_number` or `kaprekar_calculator_calculate`,
 * update triggers/tags—those names are no longer emitted from this app.
 */

/**
 * dataLayer `event` value (GTM custom event name).
 * Emitted after a **valid** Calculate (including **Enter** in the form) or when **Random** runs;
 * distinguish with `buttonName` on the payload (`trackKaprekarInteraction`).
 */
export const KAPREKAR_INTERACTION_EVENT = 'kaprekar_button_click' as const;

/** dataLayer `component` for Kaprekar calculator pushes. */
export const KAPREKAR_COMPONENT = 'kaprekar_calculator' as const;

/** Logical source for {@link trackKaprekarInteraction} (`buttonName` in dataLayer). */
export type KaprekarInteractionKind = 'calculate' | 'random';

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

/**
 * Kaprekar calculator: one GTM event + `buttonName` + fixed `component`.
 * `calculate` = successful form submit (Calculate click **or** Enter in the input); `random` = Random control.
 */
export function trackKaprekarInteraction(kind: KaprekarInteractionKind): void {
  pushDataLayer({
    event: KAPREKAR_INTERACTION_EVENT,
    component: KAPREKAR_COMPONENT,
    buttonName: kind,
  });
}
