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
