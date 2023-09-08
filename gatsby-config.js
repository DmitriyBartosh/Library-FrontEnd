/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    title: `Графикси`,
    siteUrl: `http://localhost:3000`
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2000,
              linkImagesToOriginal: false,
              quality: 85,
              showCaptions: true,
              withWebp: true,
              withAvif: true,

            },
          },
        ],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "articlesdesign",
        path: `${__dirname}/src/data/articles/design/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "articlesdesign",
        path: `${__dirname}/src/data/articles/design/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "experts",
        path: `${__dirname}/src/data/experts/design/`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "directions",
        path: `${__dirname}/src/data/directions/`
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "works",
        path: `${__dirname}/src/data/works/`
      },
    },
  ]
};