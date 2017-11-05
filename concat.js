var concat = require('concatenate-files');
concat([
/*    './dist/0.chunk.js',*/
    './dist/inline.bundle.js',
    './dist/polyfills.bundle.js',
    './dist/vendor.bundle.js',
    './dist/main.bundle.js',
    './dist/0.chunk.js'
], './dist/app.js', function(err) {
    if (err) throw err
    console.log('concat done');
});