import React from 'react'
import Content from '../components/articles/content';

function Article(context) {
  const { frontmatter, html, excerpt } = context.pageContext.data;

  return (
    <section>
      <Content html={html} frontmatter={frontmatter} excerpt={excerpt} />
    </section>
  )
}

export default Article