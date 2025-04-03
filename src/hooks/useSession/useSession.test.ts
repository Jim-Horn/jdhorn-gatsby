import { renderHook, act } from '@testing-library/react';
import { useSession } from './useSession';

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    length: 0,
    key: jest.fn((index: number) => ''),
  };
})();

// Mock console.error to avoid polluting test output
const originalConsoleError = console.error;
console.error = jest.fn();

describe('useSession', () => {
  beforeAll(() => {
    // Replace the real sessionStorage with our mock
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
    });
  });
  
  afterAll(() => {
    // Restore console.error
    console.error = originalConsoleError;
  });
  
  beforeEach(() => {
    // Clear the mock sessionStorage before each test
    mockSessionStorage.clear();
    jest.clearAllMocks();
  });
  
  it('returns the initial value when no value is in sessionStorage', () => {
    const initialValue = { name: 'John', age: 30 };
    const { result } = renderHook(() => useSession('testKey', initialValue));
    
    expect(result.current[0]).toEqual(initialValue);
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith('testKey');
  });
  
  it('returns the value from sessionStorage when available', () => {
    const storedValue = { name: 'Jane', age: 25 };
    mockSessionStorage.getItem.mockReturnValueOnce(JSON.stringify(storedValue));
    
    const { result } = renderHook(() => useSession('testKey', { name: 'John', age: 30 }));
    
    expect(result.current[0]).toEqual(storedValue);
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith('testKey');
  });
  
  it('updates sessionStorage when the value changes', () => {
    const { result } = renderHook(() => useSession('testKey', 'initial'));
    
    act(() => {
      const setValue = result.current[1];
      setValue('updated');
    });
    
    expect(result.current[0]).toBe('updated');
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('updated'));
  });
  
  it('handles JSON parsing errors gracefully', () => {
    // Simulate a corrupted value in sessionStorage
    mockSessionStorage.getItem.mockReturnValueOnce('invalid-json');
    
    const initialValue = { name: 'John', age: 30 };
    const { result } = renderHook(() => useSession('testKey', initialValue));
    
    expect(result.current[0]).toEqual(initialValue);
    expect(console.error).toHaveBeenCalled();
  });
  
  it('handles sessionStorage errors gracefully', () => {
    // Simulate an error when setting to sessionStorage
    mockSessionStorage.setItem.mockImplementationOnce(() => {
      throw new Error('Storage error');
    });
    
    const { result } = renderHook(() => useSession('testKey', 'initial'));
    
    act(() => {
      const setValue = result.current[1];
      setValue('updated');
    });
    
    expect(result.current[0]).toBe('updated');
    expect(console.error).toHaveBeenCalled();
  });
});
