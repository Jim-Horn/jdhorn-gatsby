---
slug: '/testing-styled-components'
date: '2023-03-25'
title: 'Testing styled components'
seoTitle: 'Testing Styled components'
tags: react, styled-components, testing
---

I ran across an interesting problem this week - trying to figure out how to test styled components. Here's the scoop on the entire effort.

The whole thing started with creating stories for StoryBook - trying to match designs made in Figma. Anyhow, I'd created a `ListWrapper` component to wrap a styled-component, and after reusing that function a few times, decided to move it to a separate file for reuse in other stories.

Issue? No issue! But then in the report I spotted the fact that there was no test coverage on that component, and I wondered what the easiest way to test `styled-components` was.

Here's what the component looks like - pretty plain and simple, it only takes one argument - the max-width the wrapper should adjust to.

```typescript
const ListWrapper = styled.div<{ maxWidth?: number }>`
  margin: 2rem;
  max-width: ${({ maxWidth }) => `${maxWidth || 447}px`};
`;
```

The gist is that the function returns a div, and if you pass in a number for the maxWidth, that's used - otherwise it's set to 447. (The value 447 is a story for some other time.)

The purpose of the test would be to determine if the px value passed in was actually used, or if not, the default was used

Inspecting the DOM, there really isn't an indication of what width is set. Another challenge is how to select such an arbitrary dom element!

```html
<div class="ListWrapper-ui-react__sc-16c14tt-0 hlnNQq">...</div>
```

Selecting the element from the dom isn't really that much of a challenge if you use attribute selectors. This simple query will find the element. The goal is to select all the elements in the document that have a class attribute whose `classList` begins with `ListWrapper`. Note the `caret` in the query below. Just as with regex, it denotes the beginning of the string

```js
document.querySelectorAll('[class^="ListWrapper"]');
```

With the element selected, I could have started down the path of trying to grep the className that was applied, then try to figure out if the max-width was set, but there had to be a better way!

Enter the `window` object, and its `getComputedStyle` method. (See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle" rel="noopener noreferrer" target="_blank">MDN</a> for a full explanation)

```javascript
const maxWidth = window.getComputedStyle(
  container.querySelectorAll('[class^="ListWrapper"]')[0]
).maxWidth;

expect(maxWidth).toEqual('447px');
```

To be continued...
