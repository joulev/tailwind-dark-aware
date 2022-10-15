import invertColour from "./invert-colour";

it("Should invert normal colour correctly", () => {
  expect(invertColour("#000000")).toEqual("#ffffff");
  expect(invertColour("#3fef08")).toEqual("#47f710");
});

it("Should take care of alpha correctly", () => {
  expect(invertColour("#00000010")).toEqual("#ffffff10");
  expect(invertColour("#3fef0810")).toEqual("#47f71010");
});
