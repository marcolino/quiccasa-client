
const sitemapFileName = "./public/sitemap.xml";
const hostName = "https://quiccasa.sistemisolari.com";
const Routes = "../src/components/Routes";

require.extensions[".svg"] = () => {} // ignore extensions which cause problems to react-router-sitemap
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"/*, "@babel/preset-es2015"*/]
});
const fs = require("fs");
const router = require(Routes).default;
const Sitemap = require("react-router-sitemap").default;

try {
  new Sitemap(router)
    .build(hostName)
    .save(sitemapFileName)
  ;

  // remove duplicate elements
  const sitemapContents = fs.readFileSync(sitemapFileName).toString().split("\n");
  sitemapContentsUniqueArray = sitemapContents.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  });
  const stream = fs.createWriteStream(sitemapFileName);
  stream.on('error', err => console.error(err.message));
  sitemapContentsUniqueArray.forEach((row, index, array) => stream.write(row + ((index === array.length - 1) ? "" : "\n")));
  stream.end();
  
  console.log(`Sitemap built`);
} catch(e) {
  console.error(`Error building the sitemap: ${e}`);
}

