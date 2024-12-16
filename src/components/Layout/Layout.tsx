import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import { AuthProvider, useAuth } from '../AuthContext';
import { ImageHeader } from '..';
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

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated, login, logout } = useAuth();
  const [password, setPassword] = React.useState('');

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ImageHeader />
      <StyledMainContainer>
        <main>
          {isAdminRoute && !isAuthenticated ? (
            <div>
              <h1>Admin Login</h1>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={() => login(password)}>Login</button>
            </div>
          ) : (
            <>
              {isAdminRoute && (
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
              {children}
            </>
          )}
        </main>
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

// Wrap the Layout with AuthProvider
const Layout = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <LayoutComponent>{children}</LayoutComponent>
  </AuthProvider>
);

export { Layout };
