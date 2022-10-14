import plugin from "tailwindcss/plugin";
import colourToCSS from "./utils/colour-to-css";
import invertColour from "./utils/invert-colour";
import flattenPalette from "./utils/flatten-palette";
import getInvertInPalette from "./utils/get-invert-in-palette";
import type { ColourObject, ColourInfo, CSSRuleObject } from "$types";

export = plugin(({ matchUtilities, theme, corePlugins }) => {
  const suffix = "wd";

  function generateUtility(
    clsName: string,
    cssSelector: string,
    cssProp: string | string[],
    themeName: string,
    opacityPlugin?: string,
    opacityVar?: string,
    customCSS?: CSSRuleObject,
  ) {
    matchUtilities(
      {
        [`${clsName}-${suffix}`]: (value: string | ColourInfo) => {
          const cssOpacityVar =
            opacityPlugin && corePlugins(opacityPlugin) ? opacityVar : undefined;
          if (typeof value === "string")
            return colourToCSS(
              [value, invertColour(value)],
              cssSelector,
              cssProp,
              cssOpacityVar,
              customCSS,
            );
          const [palette, shade] = value;
          const prefix = palette === "" ? themeName : `${themeName}.${palette}`;
          const current = theme<string>(`${prefix}.${shade}`);
          if (shade === "DEFAULT")
            return colourToCSS(current, cssSelector, cssProp, cssOpacityVar, customCSS);
          const invert = getInvertInPalette(theme<ColourObject>(prefix), shade);
          return colourToCSS([current, invert], cssSelector, cssProp, cssOpacityVar, customCSS);
        },
      },
      { values: flattenPalette(theme(themeName)), type: ["color"] },
    );
  }

  generateUtility(
    "divide",
    "& > :not([hidden]) ~ :not([hidden])",
    "border-color",
    "divideColor",
    "divideOpacity",
    "--tw-divide-opacity",
  );

  generateUtility(
    "border",
    "&",
    "border-color",
    "borderColor",
    "borderOpacity",
    "--tw-border-opacity",
  );
  generateUtility(
    "border-x",
    "&",
    ["border-left-color", "border-right-color"],
    "borderColor",
    "borderOpacity",
    "--tw-border-opacity",
  );
  generateUtility(
    "border-y",
    "&",
    ["border-top-color", "border-bottom-color"],
    "borderColor",
    "borderOpacity",
    "--tw-border-opacity",
  );
  for (const side of ["top", "right", "bottom", "left"]) {
    generateUtility(
      `border-${side.substring(0, 1)}`,
      "&",
      `border-${side}-color`,
      "borderColor",
      "borderOpacity",
      "--tw-border-opacity",
    );
  }

  generateUtility(
    "bg",
    "&",
    "background-color",
    "backgroundColor",
    "backgroundOpacity",
    "--tw-bg-opacity",
  );

  generateUtility("text", "&", "color", "textColor", "textOpacity", "--tw-text-opacity");

  generateUtility("decoration", "&", "text-decoration-color", "textDecorationColor");

  generateUtility(
    "placeholder",
    "&::placeholder",
    "color",
    "placeholderColor",
    "placeholderOpacity",
    "--tw-placeholder-opacity",
  );

  generateUtility("caret", "&", "caret-color", "caretColor");

  generateUtility("accent", "&", "accent-color", "accentColor");

  generateUtility("shadow", "&", "--tw-shadow-color", "boxShadowColor", undefined, undefined, {
    "--tw-shadow": "var(--tw-shadow-colored)",
  });

  generateUtility("outline", "&", "outline-color", "outlineColor");

  generateUtility("ring", "&", "--tw-ring-color", "ringColor", "ringOpacity", "--tw-ring-opacity");

  generateUtility("ring-offset", "&", "--tw-ring-offset-color", "ringOffsetColor");
});
