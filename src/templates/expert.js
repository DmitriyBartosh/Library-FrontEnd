import React from "react";
import Main from "../components/navigation/main";
import Preview from "../components/experts/preview";
import About from "../components/experts/about";
import Footer from "../components/footer";

function Expert(context) {
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
    <section>
      <Main />
      <Preview data={previewData} />
      <About data={aboutauthorData} alt={previewFrontmatter.name} />
      <Footer />
    </section>
  );
}

export default Expert;
