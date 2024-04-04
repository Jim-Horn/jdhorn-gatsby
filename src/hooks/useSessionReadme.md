### README Documentation

#### `useSession` Hook

The `useSession` hook is a custom React hook for managing state synchronized with the sessionStorage. It facilitates storing and retrieving stateful values in the session storage with automatic JSON parsing and serialization.

##### Usage

1. **Import the hook:**

   ```tsx
   import { useSession } from './path/to/useSession';
   ```

2. **Use the hook in your component:**

   ```tsx
   const [myState, setMyState] = useSession<Type>('myKey', initialValue);
   ```

   - `Type`: Replace `Type` with the type of the value you want to store (e.g., `string`, `number`, `boolean`, `object`, etc.).
   - `'myKey'`: A unique string identifier for the session storage entry.
   - `initialValue`: (Optional) The initial value for the state; it will be used if there is nothing in the session storage under the given key.

##### Naming Convention

- The returned state and setter function, `[myState, setMyState]` in this case, can be named according to the data they represent. For instance, `[userSessionData, setUserSessionData]` could be used for user session data.

##### Parameters

- `key: string`: A unique key string for the session storage entry.
- `initialValue?: T`: (Optional) The initial value of the type `T` that you expect to store.

##### Returns

- `[value, setValue]`: A tuple where `value` is the current state, and `setValue` is a function to update the state and sync it with sessionStorage.

##### Example

```tsx
import React from 'react';
import { useSession } from './path/to/useSession';

const MyComponent = () => {
  const [userSessionData, setUserSessionData] = useSession<{
    name: string;
    age: number;
  }>('userSession', { name: 'John Doe', age: 30 });

  return (
    <div>
      <p>Name: {userSessionData.name}</p>
      <p>Age: {userSessionData.age}</p>
      <button
        onClick={() =>
          setUserSessionData({
            ...userSessionData,
            age: userSessionData.age + 1,
          })
        }>
        Increase Age
      </button>
    </div>
  );
};

export default MyComponent;
```

##### Accessing Data Across Pages

To access the session data on a different page or component, use the `useSession` hook with the same `key`. This will ensure the data is consistent across your application.

```tsx
import React from 'react';
import { useSession } from './path/to/useSession';

const AnotherComponent = () => {
  const [userSessionData, setUserSessionData] = useSession<{
    name: string;
    age: number;
  }>('userSession');

  // Data can be directly used or manipulated as needed
  return (
    <div>
      <p>Name: {userSessionData?.name}</p>
      <p>Age: {userSessionData?.age}</p>
    </div>
  );
};

export default AnotherComponent;
```

In this example, `AnotherComponent` accesses the same session data (`userSessionData`) set by `MyComponent` by using the same key (`'userSession'`). This illustrates how shared state can be maintained across different components or pages of the application.
