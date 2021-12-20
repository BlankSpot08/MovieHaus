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
      "mongodb+srv://chapter:123@cluster0.xven2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    DB_NAME: "chaptersdb",
    DEV_URL: "http://localhost:3000",
    PROD_URL: "",
  },
};
