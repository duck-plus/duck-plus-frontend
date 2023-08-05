const path = require("path");

module.exports = {
  babel: {
    plugins: [
      process.env.NODE_ENV === "development" &&
        "babel-plugin-styled-components",
    ].filter(Boolean),
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      const oneOf = webpackConfig.module.rules.find(
        (cand) => !!cand.oneOf
      ).oneOf;

      oneOf.push({
        test: [/\.mp4$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
      });
      return webpackConfig;
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "@/(.*)$": "<rootDir>/src/$1",
        "react-router-typesafe-routes/dom": require.resolve(
          "react-router-typesafe-routes/dom"
        ),
      },
    },
  },
};
