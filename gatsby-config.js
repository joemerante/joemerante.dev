module.exports = {
  siteMetadata: {
    title: 'joemerante.dev',
    description: `A collection of notes, quick references, and other ideas.`,
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
        logo: 'https://joemerante.dev/images/joe_headshot.png',
      },
    },
  ],
}
