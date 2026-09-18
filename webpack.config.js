import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  const isDev = env.mode === "development";

  return {
    mode: env.mode || "development",
    entry: path.resolve(__dirname, "src", "js", "index.js"),
    
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDev ? "[name].bundle.js" : "[name].bundle.[contenthash].js",
      publicPath: "/",
      clean: true,
    },

 resolve: {
    alias: {

      '@': path.resolve(__dirname, 'src'),
    },
  },


    cache: {
      type: "filesystem",
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "src", "pages", "index.html"),
        scriptLoading: 'defer',
      }),
      isDev && new webpack.ProgressPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash:8].css",
          chunkFilename: "[name].[contenthash:8].css",
        }),
    ].filter(Boolean),

    module: {
      rules: [
         {
      test: /\.css$/i,
      use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["autoprefixer"],
            },
          },
        },
      ],
    },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins:["autoprefixer"],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
        test: /\.html$/i,
        loader: 'html-loader', // Заставляет Webpack видеть картинки внутри тегов <img>
      },
        {

          test: /\.(png|svg|jpg|jpeg|gif|webp|avif|ico|tiff)$/i,
          type: "asset/resource",
          generator: {
          filename: 'images/[name][ext]',
        },
        },
        {
          test: /\.(png|jpg|jpeg)$/i,
          type: "asset/resource",
          // Это правило сработает ТОЛЬКО если в HTML написано ?webp
          resourceQuery: /webp/, 
          generator: {
            // Принудительно меняем расширение файла в dist на .webp
            filename: isDev ? 'images/[name].webp' : 'images/[name].[contenthash:8].webp',
          },
        },
      ],
    },

    optimization: {
      minimize: !isDev,

      splitChunks: {
        chunks: "all",
      },

      minimizer: [

        !isDev &&
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),


        !isDev && new CssMinimizerPlugin(),


        !isDev &&
  new ImageMinimizerPlugin({
    // Ищем все скопированные плагином растровые картинки в dist
    test: /\.(png|jpg|jpeg|gif|webp|avif)$/i, 
    minimizer: {
      implementation: ImageMinimizerPlugin.sharpMinify,
      options: {
        encodeOptions: {
          jpeg: { quality: 75, progressive: true },
          jpg: { quality: 75, progressive: true },
          png: { compressionLevel: 9, palette: true },
        },
      },
    },
  }),

!isDev &&
  new ImageMinimizerPlugin({
    // Отдельно сжимаем и очищаем от мусора все SVG-файлы
    test: /\.svg$/i,
    minimizer: {
      implementation: ImageMinimizerPlugin.svgoMinify,
      options: {
        // НАСТРОЙКИ СВГО: передаются сразу в options, без encodeOptions!
        multipass: true,
        plugins: [
          "removeDoctype",
          "removeXMLProcInst",
          "removeComments",
          "removeMetadata",
          "minifyStyles",
          "convertStyleToAttrs"
        ],
      },
    },
  }),
      ].filter(Boolean),
    },

    devtool: isDev ? "inline-source-map" : false,

    devServer: isDev
      ? {
          port: 7272,
          open: true,
          historyApiFallback: true,
          watchFiles: [path.resolve(__dirname, "src", "pages", "index.html")], 
          static: {
      directory: path.join(__dirname, 'src'), // если картинки лежат в src/assets
    },
        }

      : undefined,
  };
};
