const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    let res = generateMessage("test", "Is this working?");
    expect(res.from).toEqual("test");
    expect(res.text).toEqual("Is this working?");
    expect(typeof res.createdAt).toEqual("number");
  });
});
