const path = require("path");
const fs = require("fs");
const glob = require("glob");
const paths = require("../config/paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const allSitePath = (isEnvDevelopment) => {
  let entryFiles = glob.sync(paths.appSrc + "/pages/*");

  let map = {};
  entryFiles.forEach((item) => {
    let filename = item.substring(item.lastIndexOf("/") + 1);
    let filePath = `${item}/index.js`;

    map[filename] = [
      isEnvDevelopment &&
        require.resolve("react-dev-utils/webpackHotDevClient"),
      filePath,
    ].filter(Boolean);
  });

  return map;
};

const htmlPlugin = (isEnvProduction, isEnvDevelopment) => {
  let fileNameLists = Object.keys(allSitePath(isEnvDevelopment));
  let arr = [];
  fileNameLists.forEach((item) => {
    let filename = item.substring(item.lastIndexOf("/") + 1);
    const filepath = path.resolve(
      paths.appSrc,
      `pages/${filename}/${filename}.html`
    );
    // 检测是否存在自定义模板文件，不存在则使用公共模板
    const isExistHtml = fs.existsSync(filepath);
    arr.push(
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            filename: item + ".html",
            chunks: [item],
            template: isExistHtml
              ? filepath
              : path.resolve(paths.appSrc, `index.html`),
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      )
    );
  });

  return arr;
};

module.exports = {
  allSitePath,
  htmlPlugin,
};
