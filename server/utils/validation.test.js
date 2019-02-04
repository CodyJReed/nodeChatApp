const expect = require("expect");

// import isRealString
const { isRealString } = require("./validation");

// isRealString
describe("isRealString", () => {
  // should reject non string values
  it("should reject non string values", () => {
    const string = 98;
    const res = isRealString(string);
    expect(res).toBeFalsy();
  });
  // should reject with only spaces
  it("should reject with only spaces", () => {
    const string = "   ";
    const res = isRealString(string);
    expect(res).toBeFalsy();
  });
  // should allow string with non-space characters.
  it("should allow string with non-space characters", () => {
    const string = " Test  ";
    const res = isRealString(string);
    expect(res).toBeTruthy();
  });
});
