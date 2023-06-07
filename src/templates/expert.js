import React from 'react'
import Preview from '../components/experts/preview'
import Tasklist from '../components/experts/tasklist';
import Aboutauthor from '../components/experts/aboutauthor';
import Analysis from '../components/experts/analysis';


function Expert(context) {
  const { frontmatter, html } = context.pageContext.data;

  // Данные с Markdown для первого блока
  const previewData = {
    author: frontmatter.author,
    profession: frontmatter.profession,
    about: frontmatter.about,
    preview: frontmatter.preview_photo
  }

  // Данные с Markdown для блока с описанием эксперта
  const aboutauthorData = {
    photo: frontmatter.about_main_photo,
    about: html,
    photos: frontmatter.about_photos,
  }

  // Пять фотографией под описанием дизайн разбора
  const photosData = frontmatter.other_photos;


  return (
    <section>
      <Preview data={previewData} />
      <Tasklist />
      <Aboutauthor data={aboutauthorData} alt={frontmatter.author} />
      <Analysis data={photosData} alt={frontmatter.author} />
    </section>
  )
}

export default Expert