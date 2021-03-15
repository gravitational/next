const { symlinkSync, rmdirSync, existsSync, mkdirSync } = require("fs");
const { resolve } = require("path");
const config = require("../config.json");

const { versions } = config;

const docsPagesRoot = "pages/docs/ver";

rmdirSync(docsPagesRoot, { recursive: true });
mkdirSync(docsPagesRoot);

versions.forEach((version) => {
  const source = resolve("content", version, "docs/pages");

  const destination = resolve(docsPagesRoot, version);

  if (existsSync(source)) {
    symlinkSync(source, destination);
  }
});
