const fs = require("fs");
const path = require("path");
const plist = require("plist");

exports.convert = function convert(entriesPath, outputPath) {
  getFileNames(entriesPath).forEach(fileName => {
    const inputFilePath = formatFilePath(entriesPath, fileName);
    const contents = getFileContents(inputFilePath);
    const dayOneEntry = parseEntry(contents);
    const markdown = formatMarkdownFile(dayOneEntry);
    const outputFilePath = formatOutputPath(outputPath, dayOneEntry);
    writeFile(outputFilePath, markdown);
  });
};

function getFileContents(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function getFileNames(dirPath) {
  return fs.readdirSync(dirPath);
}

function formatFilePath(dirPath, fileName) {
  return path.join(dirPath, fileName);
}

function parseEntry(contents) {
  return plist.parse(contents);
}

function formatMarkdownFile(dayOneEntry) {
  return `---
title: "${formatTitle(dayOneEntry)}"
date: "${formatDate(dayOneEntry)}"
tags: ${formatTags(dayOneEntry)}
---

${formatBody(dayOneEntry)}
`;
}

function formatTitle(dayOneEntry) {
  return dayOneEntry["Title"] || "";
}

function formatDate(dayOneEntry) {
  const date = dayOneEntry["Creation Date"];
  return (
    date.getFullYear() +
    "-" +
    padZero(date.getMonth() + 1) +
    "-" +
    padZero(date.getDate())
  );
}

function formatTags(dayOneEntry) {
  return (dayOneEntry.Tags || [])
    .map(tag => tag.toLowerCase().replace(/ /, "-"))
    .map(tag => '"+' + tag + '"')
    .join(", ");
}

function formatBody(dayOneEntry) {
  return dayOneEntry["Entry Text"].replace(
    "\\n",
    `
`
  );
}

function formatOutputPath(outputPath, dayOneEntry) {
  return path.join(outputPath, formatOutputFileName(dayOneEntry));
}

function formatOutputFileName(dayOneEntry) {
  const date = dayOneEntry["Creation Date"];
  return (
    String(date.getFullYear()).slice(2) +
    padZero(date.getMonth() + 1) +
    padZero(date.getDate()) +
    ".md"
  );
}

function padZero(num) {
  return parseInt(num, 10) < 10 ? "0" + num : num;
}

function writeFile(filePath, markdown) {
  fs.writeFileSync(filePath, markdown);
}

exports.formatOutputFileName = formatOutputFileName;
exports.formatTags = formatTags;
exports.formatTitle = formatTitle;
exports.formatDate = formatDate;
exports.formatBody = formatBody;
