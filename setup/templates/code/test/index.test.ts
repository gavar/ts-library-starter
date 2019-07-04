import * as library from "../src";

describe("library", () => {
  it("is ES module", () => {
    expect(library).toHaveProperty("__esModule", true);
  });
});
