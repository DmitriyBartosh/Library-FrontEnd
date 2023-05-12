import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

const MetaTag = ({ data }) => {
  const { site } = useStaticQuery(query);
  const { siteUrl } = site?.siteMetadata;
  const { title, description, keywords, themeColor, slug, preview } = data;

  useEffect(() => {
    const html = document.querySelector("html");

    html.setAttribute("lang", "ru");
  });

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={`${siteUrl}${preview}`} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content={themeColor} />
      <meta property="og:url" content={`${siteUrl}${slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${preview}`} />
    </>
  );
};

export default MetaTag;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
