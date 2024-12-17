import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import { useAuth } from '../AuthContext';
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const isBrowser = typeof window !== 'undefined';

  // Use auth only in the browser
  const auth = isBrowser
    ? useAuth()
    : { isAuthenticated: false, login: () => {}, logout: () => {} };
  const { isAuthenticated, login, logout } = auth;

  const [password, setPassword] = React.useState('');
  const passwordField = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isAdminRoute && isBrowser && passwordField.current) {
      passwordField.current.focus();
    }
  }, [isAdminRoute, isBrowser]);

  const shouldShowLogin = isAdminRoute && isBrowser && !isAuthenticated;

  return (
    <>
      <ImageHeader />
      <StyledMainContainer>
        <main>
          {shouldShowLogin ? (
            <div>
              <h1>Admin Login</h1>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  login(password);
                  setPassword('');
                }}>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  ref={passwordField}
                />
                <button type="submit">Login</button>
              </form>
            </div>
          ) : (
            <>
              {isAdminRoute && isBrowser && (
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

export { Layout };
