import { useState, useEffect } from 'react';

function useSession<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error parsing session storage item', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting session storage item', key, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export { useSession };
