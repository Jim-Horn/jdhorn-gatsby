import { pushDataLayer } from './gtm';

describe('pushDataLayer', () => {
  afterEach(() => {
    delete (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  });

  it('creates dataLayer and appends payloads', () => {
    pushDataLayer({ event: 'kaprekar_random_number', component: 'kaprekar' });

    expect(window.dataLayer).toEqual([
      { event: 'kaprekar_random_number', component: 'kaprekar' },
    ]);

    pushDataLayer({ event: 'other' });

    expect(window.dataLayer).toHaveLength(2);
    expect(window.dataLayer?.[1]).toEqual({ event: 'other' });
  });
});
