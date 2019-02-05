const lib = require("./lib.js");

describe("#formatBody", () => {
  it("transforms newlines", () => {
    expect(
      lib.formatBody({
        "Entry Text": "First line\nSecond line\n\nFourth line"
      })
    ).toEqual(`First line
Second line

Fourth line`);
  });
});

describe("#formatDate", () => {
  it("formats a date", () => {
    expect(
      lib.formatDate({ "Creation Date": new Date("2012-12-01T20:00:51.000Z") })
    ).toEqual("2012-12-01");
  });
});

describe("#formatTags", () => {
  it("combines tags", () => {
    expect(
      lib.formatTags({ Tags: ["Wow", "smiles", "felt plastered"] })
    ).toEqual('"+wow", "+smiles", "+felt-plastered"');
  });
});

describe("#formatTitle", () => {
  it("has empty string for lacking title", () => {
    expect(lib.formatTitle({})).toEqual("");
  });
});

describe("#formatOutputFileName", () => {
  it("uses the creation date", () => {
    expect(
      lib.formatOutputFileName({
        "Creation Date": new Date("2014-02-01T20:00:51.000Z")
      })
    ).toEqual("140201.md");
  });
});
