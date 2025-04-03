import "@testing-library/jest-dom"

// Mock gatsby
jest.mock('gatsby', () => {
  const React = require('react')
  return {
    ...jest.requireActual('gatsby'),
    graphql: jest.fn(),
    Link: jest.fn().mockImplementation(
      // these props are invalid for an `a` tag
      ({
        activeClassName,
        activeStyle,
        getProps,
        innerRef,
        partiallyActive,
        ref,
        replace,
        to,
        ...rest
      }) => {
        return React.createElement("a", {
          ...rest,
          href: to,
        })
      }
    ),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(),
  }
})
