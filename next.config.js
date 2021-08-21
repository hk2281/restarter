const withLess = require('next-with-less')

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': '#0AC789',
        'border-radius-base': '2px',
      },
    },
  },
})
