import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
} from 'gatsby-plugin-image';
import styled from 'styled-components';

interface Media {
  description?: string;
  gatsbyImageData: IGatsbyImageData;
}

interface HeaderImageNode {
  identifier: string;
  media: Media;
}

interface QueryResult {
  allContentfulHeaderImage: {
    nodes: HeaderImageNode[];
  };
}

const HeaderWrapper = styled.header`
  position: relative;
  height: 20rem;
`;

const HeaderContentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20rem;
  max-width: 54rem;
  color: #fff;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  max-width: 40%;
  /* Adjustments for the StaticImage component can be made here if needed */
`;

// const Logo = styled.div`
//   position: absolute;
//   top: 20px;
//   left: 20px;
//   z-index: 2;
//   max-width: 40%;
//   img {
//     max-width: 175px;
//     width: 100%;
//   }
// `;

const Menu = styled.nav`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
  max-width: 50%;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const MenuItem = styled(Link)`
  color: #fff;
  text-shadow: #000 1px 1px 2px;
  text-decoration: none;
  font-size: 1rem;
`;

const HeaderImage = styled(GatsbyImage)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Header: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<HeaderImageNode | null>(
    null,
  );

  const data: QueryResult = useStaticQuery(graphql`
    query HeaderImage {
      allContentfulHeaderImage {
        nodes {
          identifier
          media {
            description
            gatsbyImageData(
              placeholder: BLURRED
              layout: FULL_WIDTH
              width: 1600
              cropFocus: BOTTOM
            )
          }
        }
      }
    }
  `);

  useEffect(() => {
    const images = data.allContentfulHeaderImage.nodes;
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, [data.allContentfulHeaderImage.nodes]);

  return (
    <HeaderWrapper>
      {selectedImage?.media.gatsbyImageData && (
        <HeaderImage
          image={selectedImage.media.gatsbyImageData || undefined}
          title={selectedImage.media.description || 'Header Image'}
          alt=""
        />
      )}
      <HeaderContentContainer>
        <LogoWrapper>
          <Link to="/">
            <StaticImage
              src="../images/jdhorn-logo-white.png"
              alt="JDHorn.com logo"
              title="JDHorn.com"
              placeholder="blurred"
              width={175}
            />
          </Link>
        </LogoWrapper>
        <Menu>
          <MenuList>
            <li>
              <MenuItem to="/">Home</MenuItem>
            </li>
            <li>
              <MenuItem to="/posts">Posts</MenuItem>
            </li>

            <li>
              <MenuItem to="/web-toys">Web toys</MenuItem>
            </li>
            <li>
              <MenuItem to="/about">About</MenuItem>
            </li>
            <li>
              <MenuItem to="/contact">Contact</MenuItem>
            </li>
          </MenuList>
        </Menu>
      </HeaderContentContainer>
    </HeaderWrapper>
  );
};

export default Header;
