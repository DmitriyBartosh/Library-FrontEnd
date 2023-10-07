const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Страницы экспертов
  const expertsData = await graphql(`
    query {
      previewExpert: allFile(
        filter: {
          sourceInstanceName: { eq: "experts" }
          relativeDirectory: { eq: "preview" }
        }
      ) {
        edges {
          node {
            name
            childMarkdownRemark {
              html
              frontmatter {
                name
                direction
                author
                social {
                  name
                  url
                }
                preview_photo {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
      aboutExpert: allFile(
        filter: {
          sourceInstanceName: { eq: "experts" }
          relativeDirectory: { eq: "about" }
        }
      ) {
        edges {
          node {
            name
            childMarkdownRemark {
              html
              frontmatter {
                name
                service
                title
                description
                photo {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                photos {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                other_photos {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const directionData = await graphql(`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            active
            about
            price
            works {
              title
              slug
              tags
              steps
              description
              icon
            }
          }
        }
      }
    }
  `);

  // Страницы для статей
  const articleData = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "articlesdesign" } }) {
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
  `);

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
  `);

  // Страницы направлений
  directionData.data.allDirectionsJson.edges.forEach((data) => {
    const slug = data.node.slug;

    createPage({
      path: `/directions/${slug}`,
      component: path.resolve("./src/templates/direction.js"),
      context: {
        data: data.node,
      },
    });
  });

  // Страницы экспертов
  expertsData.data.previewExpert.edges.forEach((data) => {
    const slug = data.node.name;

    const about = expertsData.data.aboutExpert.edges.find(
      (item) => item.node.name === slug
    ).node.childMarkdownRemark;

    createPage({
      path: `/experts/${slug}`,
      component: path.resolve("./src/templates/expert.js"),
      context: {
        preview: data.node.childMarkdownRemark,
        about: about,
      },
    });
  });

  // Страницы статей
  articleData.data.allFile.edges.forEach((data) => {
    const { name, childMarkdownRemark } = data.node;

    createPage({
      path: `/articles/${name}`,
      component: path.resolve("./src/templates/article.js"),
      context: {
        data: childMarkdownRemark,
      },
    });
  });

  // Работы в направлении Дизайн
  works.data.allDirectionsJson.edges.forEach((data) => {
    const { slug, works } = data.node;

    works.forEach((work) => {
      createPage({
        path: `/${slug}/${work.slug}`,
        component: path.resolve("./src/templates/work.js"),
        context: {
          slug: `${slug}/` + work.slug,
          specification: `${slug}/` + work.slug + "/specifications",
          checklist: `${slug}/` + work.slug + "/checklist",
          direction: slug,
          theme: work.slug,
          title: work.title,
          description: work.description,
        },
      });
    });
  });
};
