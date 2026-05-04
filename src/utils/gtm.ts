/** Custom `event` names for GTM triggers (see gatsby-plugin-google-tagmanager). */
export const GTM_CUSTOM_EVENTS = {
  kaprekarCalculatorRandomNumber: 'kaprekar_calculator_random_number',
} as const;

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
