import * as plugin from "tailwindcss/plugin";
import * as Color from "color";
import { flattenColourPalette } from "./utils";
import type { ColourObject } from "./types";

export = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "text-wd": (value: string | [string, string]) => {
        if (typeof value === "string") {
          const [h, s, l] = Color(value).hsl().array();
          const invert = Color.hsl(h, s, 100 - l);
          return {
            color: value,
            "@media (prefers-color-scheme: dark)": { color: invert.hex() },
          };
        }

        const [palette, shade] = value;
        const prefix = palette === "" ? "textColor" : `textColor.${palette}`;

        if (shade === "DEFAULT") {
          const color = theme(`${prefix}.DEFAULT`) as string;
          return {
            color,
            "@media (prefers-color-scheme: dark)": { color },
          };
        }

        const paletteColours = (
          Object.entries(theme(prefix) as ColourObject).filter(
            ([key, value]) =>
              key !== "50" &&
              key !== "DEFAULT" &&
              typeof value === "string" &&
              !["inherit", "currentColor", "transparent"].includes(value),
          ) as [string, string][]
        )
          .map(([key, val]) => [key, val, Color(val).luminosity()] as const)
          .sort((a, b) => a[2] - b[2]);

        const thisColour = theme(`${prefix}.${shade}`) as string;
        const invert =
          paletteColours[
            paletteColours.length - 1 - paletteColours.findIndex(([key]) => key === shade)
          ][1];

        return {
          color: thisColour,
          "@media (prefers-color-scheme: dark)": {
            color: invert,
          },
        };
      },
    },
    { values: flattenColourPalette(theme("textColor")), type: ["color"] },
  );
});
