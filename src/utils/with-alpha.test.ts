import { withAlphaValue, withAlphaVariable } from "./with-alpha";

describe("withAlphaValue function", () => {
  it("Should return default value if colour can't be parsed", () => {
    expect(withAlphaValue("invalid", 0.5, "default")).toBe("default");
  });

  it("Should work for colour without alpha", () => {
    expect(withAlphaValue("#123456", 0.5, "default")).toBe("rgb(18 52 86 / 0.5)");
  });

  it("Should work for colours with alpha", () => {
    expect(withAlphaValue("rgba(18, 52, 86, 0.1)", 0.5, "default")).toBe("rgb(18 52 86 / 0.5)");
  });
});

describe("withAlphaVariable function", () => {
  it("Should work for normal colours", () => {
    const css = withAlphaVariable({ colour: "#123456", property: "color", variable: "--alpha" });
    expect(css).toEqual({ "--alpha": "1", color: "rgb(18 52 86 / var(--alpha))" });
  });

  it("Should work for invalid colours", () => {
    const css = withAlphaVariable({
      colour: "transparent",
      property: "color",
      variable: "--alpha",
    });
    expect(css).toEqual({ color: "transparent" });
  });

  it("Should work for colours with alpha", () => {
    const css = withAlphaVariable({
      colour: "rgba(18, 52, 86, 0.1)",
      property: "color",
      variable: "--alpha",
    });
    expect(css).toEqual({ color: "rgba(18, 52, 86, 0.1)" });
  });

  it("Should work for several properties", () => {
    const css = withAlphaVariable({
      colour: "#123456",
      property: ["color", "background-color"],
      variable: "--alpha",
    });
    expect(css).toEqual({
      "--alpha": "1",
      color: "rgb(18 52 86 / var(--alpha))",
      "background-color": "rgb(18 52 86 / var(--alpha))",
    });
  });
});
