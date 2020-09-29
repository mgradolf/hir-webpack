/* craco.config.js */
const path = require("path")
module.exports = function ({ env }) {
  return {
    webpack: {
      alias: {
        "~": path.resolve(__dirname, "src")
      }
    },
    style: {
      sass: {
        loaderOptions: (sassLoaderOptions, { env, paths }) => {
          sassLoaderOptions = {
            ...sassLoaderOptions,
            prependData: "@import './src/Sass/global/index.scss';", // it can be a function to load sass data from environment
            implementation: require("node-sass"),
            sourceMap: true,
            sassOptions: {
              indentWidth: 2,
              outputStyle: "compressed"
            }
          }
          return sassLoaderOptions
        }
      }
    },
    jest: {
      configure: {
        moduleNameMapper: {
          "^~(.*)$": "<rootDir>/src/$1"
        }
      }
    }
  }
}
