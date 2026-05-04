import {
  pushDataLayer,
  trackEvent,
  trackKaprekarButtonClick,
  KAPREKAR_COMPONENT,
  KAPREKAR_INTERACTION_EVENT,
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

  it('merges params and always uses the first argument as event', () => {
    trackEvent('my_event', { buttonName: 'x', foo: 1 });

    expect(window.dataLayer).toEqual([
      { buttonName: 'x', foo: 1, event: 'my_event' },
    ]);
  });

  it('does not let params.event override the event name', () => {
    trackEvent('real_event', { event: 'wrong', other: true });

    expect(window.dataLayer).toEqual([{ other: true, event: 'real_event' }]);
  });

  it('allows an explicit component in params', () => {
    trackEvent('other_feature', {
      component: 'other_widget',
      action: 'save',
    });

    expect(window.dataLayer).toEqual([
      { component: 'other_widget', action: 'save', event: 'other_feature' },
    ]);
  });
});

describe('trackKaprekarButtonClick', () => {
  afterEach(() => {
    delete (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  });

  it('pushes the Kaprekar interaction shape', () => {
    trackKaprekarButtonClick('calculate');

    expect(window.dataLayer).toEqual([
      {
        event: KAPREKAR_INTERACTION_EVENT,
        component: KAPREKAR_COMPONENT,
        buttonName: 'calculate',
      },
    ]);
  });
});
