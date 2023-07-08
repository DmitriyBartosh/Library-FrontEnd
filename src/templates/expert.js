import React from 'react'
import Preview from '../components/experts/preview'
import Tasklist from '../components/experts/tasklist';
import Aboutauthor from '../components/experts/aboutauthor';
import Analysis from '../components/experts/analysis';


function Expert(context) {
  const {
    author,
    profession,
    preview_text,
    preview_photo,
    about_main_photo,
    about,
    about_photos,
    other_photos
  } = context.pageContext.data;

  // Данные с Markdown для первого блока
  const previewData = {
    author: author,
    profession: profession,
    text: preview_text,
    preview: preview_photo
  }

  // Данные с Markdown для блока с описанием эксперта
  const aboutauthorData = {
    photo: about_main_photo,
    about: about,
    photos: about_photos,
  }

  // Пять фотографией под описанием дизайн разбора
  const photosData = other_photos;

  return (
    <section>
      <Preview data={previewData} />
      <Tasklist />
      <Aboutauthor data={aboutauthorData} alt={author} />
      <Analysis data={photosData} alt={author} />
    </section>
  )
}

export default Expert