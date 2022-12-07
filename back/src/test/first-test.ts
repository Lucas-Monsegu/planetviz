import { expect } from "chai";
import { test } from "../misc/";

describe("Tests", () => {
  it("shoudl return true", () => {
    const result = test();
    expect(result).to.equal("test");
  });
});
