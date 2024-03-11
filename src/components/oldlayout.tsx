import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { ImageHeader } from '.';
import './layout.css';

const StyledMainContainer = styled.div`
  margin: 0 auto;
  max-width: var(--size-content);
  padding: var(--size-gutter);
`;

const StyledFooter = styled.footer`
  margin-top: var(--space-5);
  font-size: var(--font-sm);
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <ImageHeader />
      <StyledMainContainer>
        <main>{children}</main>
        <StyledFooter>
          &copy; {new Date().getFullYear()} &middot; <Link to="/">Home</Link>
          &nbsp; &middot; <Link to="/contact">Contact</Link>&nbsp; &middot;{' '}
          <Link to="/sitemap">Sitemap</Link> &middot;{' '}
          <Link to="/about">About</Link> &middot;{' '}
          <Link to="/web-toys">Web toys</Link>
        </StyledFooter>
      </StyledMainContainer>
    </>
  );
};

export { Layout };
