/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    title: `Графикси | Онлайн практикум`,
    siteUrl: `https://graphiksi.ru`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: {
        cssLoaderOptions: {
          sourceMap: true,
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.jpg",
        name: `Графикси | Онлайн практикум`,
        short_name: `Графикси`,
        start_url: `/`,
        background_color: `#f3eee1`,
        display: `standalone`,
      },
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
              maxWidth: 1200,
              linkImagesToOriginal: false,
              quality: 85,
              showCaptions: true,
              withWebp: true,
            },
          },
        ],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/src/data/articles/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "experts",
        path: `${__dirname}/src/data/experts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "directions",
        path: `${__dirname}/src/data/directions/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "works",
        path: `${__dirname}/src/data/works/`,
      },
    },
  ],
  trailingSlash: "never",
};
