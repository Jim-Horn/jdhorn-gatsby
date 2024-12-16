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

  // Use browser-only logic for auth
  const [isBrowser, setIsBrowser] = React.useState(false);
  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  const {
    isAuthenticated,
    login = () => {},
    logout = () => {},
  } = isBrowser ? useAuth() : { isAuthenticated: false };

  // Admin-specific logic
  const [password, setPassword] = React.useState('');
  const passwordField = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isAdminRoute && passwordField.current) {
      passwordField.current.focus();
    }
  }, [isAdminRoute]);

  return (
    <>
      <ImageHeader />
      <StyledMainContainer>
        <main>
          {/* Only render admin login if in the browser */}
          {isAdminRoute && isBrowser && !isAuthenticated ? (
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
              {/* Render children and admin logout button */}
              {isAdminRoute && isBrowser && (
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
              {children}
            </>
          )}
        </main>
        {/* Footer always renders */}
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
