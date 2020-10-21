// IGNORE STYLES FROM SERVER
// require('ignore-styles')
require('@babel/register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
});

// LOAD ASSETS FROM SERVER
// require('asset-require-hook')({
//   extensions: ['jpg'],
//   name: '[hash].[ext]'
// })

require('./server');
