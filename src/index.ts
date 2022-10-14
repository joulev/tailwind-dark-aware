import plugin from "tailwindcss/plugin";
import Color from "color";
import colourToCSS from "./utils/colour-to-css";
import invertColour from "./utils/invert-colour";
import flattenPalette from "./utils/flatten-palette";
import type { ColourObject, ColourInfo } from "$types";
import getInvertInPalette from "./utils/get-invert-in-palette";

export = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "text-wd": (value: string | ColourInfo) => {
        const cssProp = "color";
        const cssOpacityVar = "--tw-text-opacity";
        if (typeof value === "string")
          return colourToCSS([value, invertColour(value)], cssProp, cssOpacityVar);
        const [palette, shade] = value;
        const prefix = palette === "" ? "textColor" : `textColor.${palette}`;
        const current = theme<string>(`${prefix}.${shade}`);
        if (shade === "DEFAULT") return colourToCSS(current, cssProp, cssOpacityVar);
        const invert = getInvertInPalette(theme<ColourObject>(prefix), shade);
        return colourToCSS([current, invert], cssProp, cssOpacityVar);
      },
    },
    { values: flattenPalette(theme("textColor")), type: ["color"] },
  );
});
