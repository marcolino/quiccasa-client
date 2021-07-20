const fs = require('fs');

const sitemapFileName = "./sitemap.xml"; // TODO: "./public/sitemap.xml";
const hostName = "https://quiccasa.sistemisolari.com/"; // the url of the website: the protocol and the domain name with a trailing slash
const routesPath = "./src/components/Routes.js";
const priority = 0.5;
const freq = "monthly";

//console.log("routesPath:", routesPath);
const routes = [];
fs.readFile(routesPath, "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  data.split(/\r?\n/).forEach(line => {
    //console.log("-" + line);
    const matchRoute = /^\s*<Route (.*?) \/>/.exec(line);
    if (matchRoute !== null) {
      const matchPath = /path=[\"\'](.*?)[\"\']/.exec(matchRoute);
      //console.log("path:", matchPath[0]);
      routes.push(matchPath[0]);
    }
  });

  sitemapXml = generate_xml_sitemap(routes);

  fs.writeFile(sitemapFileName, sitemapXml, (err) => {
    if (err) {
      return console.log(err);
    }
  });

});


function generate_xml_sitemap(routes) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (const route of routes) {
    xml += `
  <url>
    <loc>${hostName}${route}</loc>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }
  xml += "</urlset>";
  return xml;
}
