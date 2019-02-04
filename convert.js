const path = require("path");

const lib = require("./lib.js");

const entriesPath = path.join(__dirname, "entries");
const outputPath = path.join(__dirname, "dist");

lib.convert(entriesPath, outputPath);
