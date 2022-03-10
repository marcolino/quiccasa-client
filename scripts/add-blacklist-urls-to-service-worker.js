"use strict";
const FS = require("fs");

const sw = "./build/service-worker.js";
const pattern = "self.addEventListener(\"fetch\",(function(t){";
const blacklist = "if (t.request.url.indexOf(\"/api/\")!==-1)return false; ";
//self.addEventListener("fetch",(function(t){if (t.request.url.indexOf("/api/")!==-1)return false; 

let contents = FS.readFileSync(sw).toString();
contents = contents.replace(pattern, pattern + blacklist);
// const start = contents.indexOf(pattern);
// const end = contents.indexOf("\n", start) - 2;
// contents = contents.substring(0, end) + ",/^\\/admin/" + contents.substring(end);
FS.writeFileSync(sw, contents);
