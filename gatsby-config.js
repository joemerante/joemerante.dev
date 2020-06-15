module.exports = {
  siteMetadata: {
    title: 'joemerante.dev',
    description: `A few notes. Theme thanks to gatsby-starter-code-notes.`,
    author: 'Joe Merante',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-code-notes',
      options: {
        basePath: '/',
        contentPath: 'notes',
        gitRepoContentPath:
          'https://github.com/joemerante/joemerante.dev/tree/master/notes/',
        showDescriptionInSidebar: true,
        showThemeInfo: false,
        logo: 'https://avatars0.githubusercontent.com/u/1133581?s=60&v=4',
      },
    },
  ],
}
