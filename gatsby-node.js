const path = require("path");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

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
                  nick
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
              free
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
  const articlesData = await graphql(`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "articles" } }
        sort: { birthTime: ASC }
      ) {
        edges {
          node {
            birthTime
            childMarkdownRemark {
              html
              timeToRead
              frontmatter {
                slug
                title
                tags
                preview {
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

  // Страницы к темам
  const works = await graphql(`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              free
              description
              programs {
                choise
                list
              }
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
        slug: slug,
      },
    });
  });

  // Страницы статей
  articlesData.data.allFile.edges.forEach((data) => {
    const { childMarkdownRemark, birthTime } = data.node;

    createPage({
      path: `/articles/${childMarkdownRemark.frontmatter.slug}`,
      component: path.resolve("./src/templates/article.js"),
      context: {
        data: childMarkdownRemark,
        birthTime: birthTime,
      },
    });
  });

  // Работы в направлении
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
          free: work.free,
          programs: work.programs,
        },
      });
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude:
          /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};
