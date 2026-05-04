import {
  pushDataLayer,
  trackEvent,
  KAPREKAR_BUTTON_CLICK_EVENT,
} from './gtm';

describe('pushDataLayer', () => {
  afterEach(() => {
    delete (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  });

  it('creates dataLayer and appends payloads', () => {
    pushDataLayer({ event: 'test_event', component: 'kaprekar' });

    expect(window.dataLayer).toEqual([
      { event: 'test_event', component: 'kaprekar' },
    ]);

    pushDataLayer({ event: 'other' });

    expect(window.dataLayer).toHaveLength(2);
    expect(window.dataLayer?.[1]).toEqual({ event: 'other' });
  });
});

describe('trackEvent', () => {
  afterEach(() => {
    delete (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  });

  it('pushes event with default component and merged params', () => {
    trackEvent(KAPREKAR_BUTTON_CLICK_EVENT, { buttonName: 'calculate' });

    expect(window.dataLayer).toEqual([
      {
        event: KAPREKAR_BUTTON_CLICK_EVENT,
        component: 'kaprekar_calculator',
        buttonName: 'calculate',
      },
    ]);
  });
});
