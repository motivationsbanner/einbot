module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
  
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
  
    resolve: {
      // Add '.ts' as resolvable extensions.
      extensions: ['.ts', '.js', '.json']
    },
  
    module: {
      rules: [
        // All files with a '.ts' or extension will be handled by 'awesome-typescript-loader'.
        { test: /\.ts$/, loader: 'awesome-typescript-loader' },
  
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
      ]
    },
    devServer: {
      contentBase: './dist',
      port: 5555
    }
  };
  