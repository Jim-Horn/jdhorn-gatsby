import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import { Layout, ListTags, Seo } from '../components';
import styled from 'styled-components';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { options } from '../utils/options';
import { consolidatePostTags } from '../utils';

const Date = styled.span`
  font-size: small;
`;

const ContentSection = styled.section`
  margin-bottom: 1rem;
`;

const HeadingSection = styled.div`
  display: flex;
  flex-direction: column;
  > h1 {
    margin-bottom: 0;
  }
  margin-bottom: 1rem;
`;

interface ContentfulPageTemplateProps {
  data: {
    contentfulPost: {
      content: { raw: string };
      date: string;
      dateDiff: string;
      seoTitle: string;
      slug: string;
      tags?: string;
      postTags?: {
        tag: string;
        friendlyName: string;
      }[];
      title: string;
    };
  };
  children: ReactNode;
}

export default function ContentfulPageTemplate({
  data,
}: ContentfulPageTemplateProps) {
  const { content, date, dateDiff, title, postTags } = data.contentfulPost;

  return (
    <Layout>
      <HeadingSection>
        <h1>{title}</h1>
        <Date title={dateDiff}>{date}</Date>
      </HeadingSection>
      <ContentSection>{renderRichText(content, options)}</ContentSection>
      {postTags && <ListTags tags={consolidatePostTags(postTags)} />}
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      dateDiff: date(fromNow: true)
      date(formatString: "dddd, MMMM DD, YYYY")
      seoTitle
      postTags {
        tag
        friendlyName
      }
      content {
        raw
        references {
          ... on ContentfulCodePen {
            # The graphql fragment used here is defined in the component itself
            ...CodePen
          }
          ... on ContentfulExternalLink {
            ...ExternalLink
          }
          ... on ContentfulAsset {
            __typename
            contentful_id
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              width: 800
            )
            description
            title
          }
          ... on ContentfulCodeBlock {
            __typename
            contentful_id
            language
            showLineNumbers
            code {
              code
            }
          }
          # see ContentfulPost in options
          # This is the data needed to render a link to a post
          ... on ContentfulPost {
            __typename
            contentful_id
            slug
            title
          }
        }
      }
    }
  }
`;

interface HeadProps {
  data: {
    contentfulPost: {
      seoTitle: string;
    };
  };
}

export const Head = ({ data }: HeadProps) => (
  <Seo title={data.contentfulPost.seoTitle} description={''} children={null} />
);
