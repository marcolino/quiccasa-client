// we need to run yarn start, yarn lighthouse to build a fresh lighthouseOutput.json...
const lighthouseOutput = require("../__tests__/lighthouseOutput.json");

describe("Accessibility", () => {
  test("Accessibility score is within acceptable threshold", () => {
    expect(lighthouseOutput.categories.accessibility.score >= 0.95);
  });
  test("All Images have alt values", () => {
    expect(lighthouseOutput.audits["image-alt"].score === 1);
  });
});