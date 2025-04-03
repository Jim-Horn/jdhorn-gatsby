import { getTabs, Tabs } from './getTabs';

describe('getTabs', () => {
  it('returns the default tab when showResult is false', () => {
    const result = getTabs({ defaultTab: 'JS', showResult: false });
    expect(result).toBe('js');
  });

  it('returns the default tab and result when showResult is true', () => {
    const result = getTabs({ defaultTab: 'HTML', showResult: true });
    expect(result).toBe('html,result');
  });

  it('returns only result when defaultTab is None and showResult is true', () => {
    const result = getTabs({ defaultTab: 'None', showResult: true });
    expect(result).toBe('result');
  });

  it('returns an empty string when defaultTab is None and showResult is false', () => {
    const result = getTabs({ defaultTab: 'None', showResult: false });
    expect(result).toBe('');
  });

  it('handles all possible tab values', () => {
    // Test each enum value
    expect(getTabs({ defaultTab: 'HTML', showResult: false })).toBe('html');
    expect(getTabs({ defaultTab: 'CSS', showResult: false })).toBe('css');
    expect(getTabs({ defaultTab: 'JS', showResult: false })).toBe('js');
    expect(getTabs({ defaultTab: 'None', showResult: false })).toBe('');
  });
});
