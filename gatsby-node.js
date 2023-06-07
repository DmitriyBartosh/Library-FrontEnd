const path = require('path');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/dashboard/)) {
    page.matchPath = "/dashboard/*";
    createPage(page);
  }
};


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const expertData = await graphql(`
    query {
      allFile(filter: {sourceInstanceName: {eq: "expertsdesign"}}) {
        edges {
          node {
            name
            childMarkdownRemark {
              html
              frontmatter {
                author
                profession
                about
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
              }
            }
          }
        }
      }
    }
  `)

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

  expertData.data.allFile.edges.forEach((data) => {
    const { name, childMarkdownRemark } = data.node;

    createPage({
      path: `/design/${name}`,
      component: path.resolve('./src/templates/expert.js'),
      context: {
        data: childMarkdownRemark
      },
    })
  })

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
}