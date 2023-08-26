const path = require('path');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/profile/)) {
    page.matchPath = "/profile/*";
    createPage(page);
  }
};


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Страницы экспертов
  const expertDesignData = await graphql(`
    query {
      allFile(filter: {sourceInstanceName: {eq: "experts"}}) {
        edges {
          node {
            childDesignJson {
              slug
              author
              profession
              preview_text
              preview_photo {
                childImageSharp {
                  gatsbyImageData
                }
              }
              about_main_photo {
                childImageSharp {
                  gatsbyImageData
                }
              }
              about_photos {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
              other_photos {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
              about
            }
          }
        }
      }
    }
  `)

  // Страницы для статей
  const articleData = await graphql(`
  query {
    allFile(filter: {sourceInstanceName: {eq: "articlesdesign"}}) {
      edges {
        node {
          name
          childMarkdownRemark {
            html
            excerpt(format: HTML)
            frontmatter {
              title
              subtitle
            }
          }
        }
      }
    }
  }
`)

  // Страницы к Графическому дизайну
  const works = await graphql(`
  query {
    allDirectionsJson {
      edges {
        node {
          slug
          title
          works {
            description
            slug
            title
          }
        }
      }
    }
  }
  `)


  // Страницы экспертов
  expertDesignData.data.allFile.edges.forEach((data) => {
    const { slug } = data.node.childDesignJson;

    createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/expert.js'),
      context: {
        data: data.node.childDesignJson
      },
    })
  })


  // Страницы статей
  articleData.data.allFile.edges.forEach((data) => {
    const { name, childMarkdownRemark } = data.node;

    createPage({
      path: `/articles/${name}`,
      component: path.resolve('./src/templates/article.js'),
      context: {
        data: childMarkdownRemark
      },
    })
  })


  // Работы в направлении Дизайн
  works.data.allDirectionsJson.edges.forEach((data) => {
    const { slug, works } = data.node;

    works.forEach((work) => {
      createPage({
        path: `/${slug}/${work.slug}`,
        component: path.resolve('./src/templates/work.js'),
        context: {
          slug: `${slug}/` + work.slug,
          specification: `${slug}/` + work.slug + "/specifications",
          checklist: `${slug}/` + work.slug + "/checklist",
          direction: slug,
          theme: work.slug,
          title: work.title,
          description: work.description,
        },
      })
    })
  })
}