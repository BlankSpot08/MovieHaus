const path = require("path");
const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});

module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      "mongodb+srv://movie_haus:123@cluster0.t14et.mongodb.net/hawkeye?retryWrites=true&w=majority",
    DB_NAME: "hawkeye",
    DEV_URL: "http://localhost:3000",
    PROD_URL: "",
    JWT_SECRET_KEY: "KEYKEY"
  },
};
