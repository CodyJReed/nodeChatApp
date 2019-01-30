const expect = require("expect");

const { generateMessage, generateLocation } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    let from = "test";
    let text = "Is this working?";
    let res = generateMessage(from, text);
    expect(res.from).toEqual(from);
    expect(res.text).toEqual(text);
    expect(typeof res.createdAt).toEqual("number");
  });
});

describe("generateLocation", () => {
  it("should generate correct location object", () => {
    const from = "test";
    const lat = "10";
    const lng = "38";
    const url = "https://www.google.com/maps?q=10,38";
    let res = generateLocation(from, lat, lng);
    expect(res.from).toEqual(from);
    expect(res.url).toEqual(url);
  });
});
