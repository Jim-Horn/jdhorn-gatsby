import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20rem;
  color: #fff;
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
`;

const Menu = styled.nav`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
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
              placeholder: TRACED_SVG
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
      <Logo>Logo Here</Logo>
      <Menu>
        <MenuList>
          <li>
            <MenuItem to="/">Home</MenuItem>
          </li>
          <li>
            <MenuItem to="/posts">Posts</MenuItem>
          </li>
          <li>
            <MenuItem to="/contact">Contact</MenuItem>
          </li>
        </MenuList>
      </Menu>
    </HeaderWrapper>
  );
};

export default Header;
