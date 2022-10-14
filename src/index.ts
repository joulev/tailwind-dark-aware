import plugin from "tailwindcss/plugin";
import colourToCSS from "./utils/colour-to-css";
import invertColour from "./utils/invert-colour";
import flattenPalette from "./utils/flatten-palette";
import type { ColourObject, ColourInfo } from "$types";
import getInvertInPalette from "./utils/get-invert-in-palette";

export = plugin(({ matchUtilities, theme, corePlugins }) => {
  function generateUtility(
    clsName: string,
    cssSelector: string,
    cssProp: string,
    themeName: string,
    opacityPlugin: string,
    opacityVar: string,
  ) {
    matchUtilities(
      {
        [clsName]: (value: string | ColourInfo) => {
          const cssOpacityVar = corePlugins(opacityPlugin) ? opacityVar : undefined;
          if (typeof value === "string")
            return colourToCSS([value, invertColour(value)], cssSelector, cssProp, cssOpacityVar);
          const [palette, shade] = value;
          const prefix = palette === "" ? themeName : `${themeName}.${palette}`;
          const current = theme<string>(`${prefix}.${shade}`);
          if (shade === "DEFAULT") return colourToCSS(current, cssSelector, cssProp, cssOpacityVar);
          const invert = getInvertInPalette(theme<ColourObject>(prefix), shade);
          return colourToCSS([current, invert], cssSelector, cssProp, cssOpacityVar);
        },
      },
      { values: flattenPalette(theme(themeName)), type: ["color"] },
    );
  }

  generateUtility("text-wd", "&", "color", "textColor", "textOpacity", "--tw-text-opacity");
});
