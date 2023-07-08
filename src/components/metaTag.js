import React from "react";
import { useEffectOnce } from "react-use";
import { useStaticQuery, graphql } from "gatsby";

const MetaTag = ({ data, themeColor }) => {
  const { site } = useStaticQuery(query);
  const { siteUrl } = site?.siteMetadata;
  const { title, description, keywords, slug, preview } = data;

  useEffectOnce(() => {
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

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hey, Coddes" />
      <meta property="og:url" content={`${siteUrl}${slug}`} />
      <meta property="og:title" content={title} />
      <meta content="ru" property="og:locale" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${preview}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={`${siteUrl}${slug}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${preview}`} />
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
