const fs = require("fs");
const path = require("path");
const plist = require("plist");

function getFileContents(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function getFiles(dirPath) {
  return fs.readdirSync(dirPath);
}

function parseContents(contents) {
  return plist.parse(contents);
}

const filesPaths = getFiles(__dirname).slice(0, 1);

filesPaths.forEach(filePath => {
  const contents = getFileContents(filePath);
  const stuff = parseContents(contents);
  console.log({ stuff });
});
