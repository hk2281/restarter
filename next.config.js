const withLess = require('next-with-less')

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': '#0AC789',
        'border-radius-base': '16px',
        'font-family': 'Muller, sans-serif',
      },
    },
  },
})
