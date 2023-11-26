import React from "react";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";
import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";
import Preview from "../components/experts/preview";
import MetaTag from "../components/metaTag";
import About from "../components/experts/about";
import Footer from "../components/footer";

function Expert(context) {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const previewHtml = context.pageContext.preview.html;
  const previewFrontmatter = context.pageContext.preview.frontmatter;

  const aboutHtml = context.pageContext.about.html;
  const aboutFrontmatter = context.pageContext.about.frontmatter;

  // Данные с Markdown для первого блока
  const previewData = {
    expert: previewFrontmatter.name,
    profession: previewFrontmatter.direction,
    text: previewHtml,
    author: previewFrontmatter.author,
    preview: previewFrontmatter.preview_photo,
    social: previewFrontmatter.social,
  };

  // Данные с Markdown для блока с описанием эксперта
  const aboutauthorData = {
    photo: aboutFrontmatter.photo,
    about: aboutHtml,
    photos: aboutFrontmatter.photos,
    other_photos: aboutFrontmatter.other_photos,
    service: aboutFrontmatter.service,
    title: aboutFrontmatter.title,
    description: aboutFrontmatter.description,
  };

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <Preview data={previewData} />
      <About data={aboutauthorData} alt={previewFrontmatter.name} />
      <Footer />
    </>
  );
}

export const Head = (context) => {
  const expert = context.pageContext.preview.frontmatter;
  const slug = context.pageContext.slug;

  const about = context.pageContext.about.frontmatter;
  const description = about.title;

  const data = {
    title: `Графикси | ${expert.name}`,
    description: description,
    slug: `/experts/${slug}`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} themeColor="#f3eee1" />;
};

export default Expert;
