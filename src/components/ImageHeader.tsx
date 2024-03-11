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
  height: 10rem;
  @media (min-width: 768px) {
    height: 20rem;
  }
`;

const HeaderContentContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  align-items: center;
  height: 10rem;
  max-width: 54rem;
  color: #fff;
  margin: 0 auto;
  padding: 1rem;
  align-content: start;
  justify-items: start;

  @media (min-width: 768px) {
    height: 20rem;
    grid-template-columns: 1fr 1fr;
    & > :last-child {
      justify-self: end;
    }
  }
`;

const LogoWrapper = styled.div`
  z-index: 2;
`;

const Menu = styled.nav`
  z-index: 2;
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

const ImageHeader: React.FC = () => {
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
          loading="lazy"
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

export { ImageHeader };
