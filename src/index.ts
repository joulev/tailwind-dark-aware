import plugin from "tailwindcss/plugin";
import colourToCSS from "./utils/colour-to-css";
import invertColour from "./utils/invert-colour";
import flattenPalette from "./utils/flatten-palette";
import getInvertInPalette from "./utils/get-invert-in-palette";
import { withAlphaVariable, withAlphaValue } from "./utils/with-alpha";
import defaultOptions from "./default-options";
import type {
  ColourObject,
  ColourInfo,
  GenerateUtilsProps,
  Options,
  ExtendedOptions,
} from "$types";

export = plugin.withOptions<Partial<Options>>(
  (userOptions = {}) =>
    ({ matchUtilities, theme, config, corePlugins }) => {
      const darkModeConfig = config("darkMode", "media") as "media" | "class" | ["class", string];
      let darkModeSelector: string;
      if (darkModeConfig === "media") darkModeSelector = "@media (prefers-color-scheme: dark)";
      else if (darkModeConfig === "class") darkModeSelector = ".dark &";
      else darkModeSelector = `${darkModeConfig[1]} &`;

      const options: ExtendedOptions = { ...defaultOptions, ...userOptions, darkModeSelector };

      function generateUtility({ className, themeName, func }: GenerateUtilsProps) {
        matchUtilities(
          {
            [`${className}-${options.suffix}`]: (value: string | ColourInfo) => {
              if (typeof value === "string")
                return colourToCSS(
                  options,
                  options.invertCustomColours ? [value, invertColour(value)] : value,
                  func,
                );

              const [palette, shade] = value;
              const prefix = palette === "" ? themeName : `${themeName}.${palette}`;
              const current = theme<string>(`${prefix}.${shade}`);

              if (shade === "DEFAULT")
                return colourToCSS(
                  options,
                  options.invertDefaultColours ? [current, invertColour(current)] : current,
                  func,
                );

              const invert = getInvertInPalette(options, theme<ColourObject>(prefix), shade);
              return colourToCSS(options, [current, invert], func);
            },
          },
          { values: flattenPalette(options, theme(themeName)), type: ["color", "any"] },
        );
      }

      generateUtility({
        className: "divide",
        themeName: "divideColor",
        func(value) {
          const selector = "& > :not([hidden]) ~ :not([hidden])";
          if (!corePlugins("divideOpacity")) return { [selector]: { "border-color": value } };
          return {
            [selector]: withAlphaVariable({
              colour: value,
              property: "border-color",
              variable: "--tw-divide-opacity",
            }),
          };
        },
      });

      generateUtility({
        className: "border",
        themeName: "borderColor",
        func(value) {
          if (!corePlugins("borderOpacity")) return { "border-color": value };
          return withAlphaVariable({
            colour: value,
            property: "border-color",
            variable: "--tw-border-opacity",
          });
        },
      });

      generateUtility({
        className: "border-x",
        themeName: "borderColor",
        func(value) {
          if (!corePlugins("borderOpacity"))
            return { "border-left-color": value, "border-right-color": value };
          return withAlphaVariable({
            colour: value,
            property: ["border-left-color", "border-right-color"],
            variable: "--tw-border-opacity",
          });
        },
      });

      generateUtility({
        className: "border-y",
        themeName: "borderColor",
        func(value) {
          if (!corePlugins("borderOpacity"))
            return { "border-top-color": value, "border-bottom-color": value };
          return withAlphaVariable({
            colour: value,
            property: ["border-top-color", "border-bottom-color"],
            variable: "--tw-border-opacity",
          });
        },
      });

      for (const side of ["top", "right", "bottom", "left"]) {
        generateUtility({
          className: `border-${side.substring(0, 1)}`,
          themeName: "borderColor",
          func(value) {
            if (!corePlugins("borderOpacity")) return { [`border-${side}-color`]: value };
            return withAlphaVariable({
              colour: value,
              property: `border-${side}-color`,
              variable: "--tw-border-opacity",
            });
          },
        });
      }

      generateUtility({
        className: "bg",
        themeName: "backgroundColor",
        func(value) {
          if (!corePlugins("backgroundOpacity")) return { "background-color": value };
          return withAlphaVariable({
            colour: value,
            property: "background-color",
            variable: "--tw-bg-opacity",
          });
        },
      });

      generateUtility({
        className: "from",
        themeName: "gradientColorStops",
        func: (value) => ({
          "--tw-gradient-from": value,
          "--tw-gradient-to": withAlphaValue(value, 0, "rgb(255 255 255 / 0)"),
          "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to)`,
        }),
      });

      generateUtility({
        className: "via",
        themeName: "gradientColorStops",
        func: (value) => ({
          "--tw-gradient-to": withAlphaValue(value, 0, "rgb(255 255 255 / 0)"),
          "--tw-gradient-stops": `var(--tw-gradient-from), ${value}, var(--tw-gradient-to)`,
        }),
      });

      generateUtility({
        className: "to",
        themeName: "gradientColorStops",
        func: (value) => ({ "--tw-gradient-to": value }),
      });

      generateUtility({
        className: "fill",
        themeName: "fill",
        func: (value) => ({ fill: value }),
      });

      generateUtility({
        className: "stroke",
        themeName: "stroke",
        func: (value) => ({ stroke: value }),
      });

      generateUtility({
        className: "text",
        themeName: "textColor",
        func(value) {
          if (!corePlugins("textOpacity")) return { color: value };
          return withAlphaVariable({
            colour: value,
            property: "color",
            variable: "--tw-text-opacity",
          });
        },
      });

      generateUtility({
        className: "decoration",
        themeName: "textDecorationColor",
        func: (value) => ({ "text-decoration-color": value }),
      });

      generateUtility({
        className: "placeholder",
        themeName: "placeholderColor",
        func(value) {
          if (!corePlugins("placeholderOpacity")) return { "&::placeholder": { color: value } };
          return {
            "&::placeholder": withAlphaVariable({
              colour: value,
              property: "color",
              variable: "--tw-placeholder-opacity",
            }),
          };
        },
      });

      generateUtility({
        className: "caret",
        themeName: "caretColor",
        func: (value) => ({ "caret-color": value }),
      });

      generateUtility({
        className: "accent",
        themeName: "accentColor",
        func: (value) => ({ "accent-color": value }),
      });

      generateUtility({
        className: "shadow",
        themeName: "boxShadowColor",
        func: (value) => ({
          "--tw-shadow-color": value,
          "--tw-shadow": "var(--tw-shadow-colored)",
        }),
      });

      generateUtility({
        className: "outline",
        themeName: "outlineColor",
        func: (value) => ({ "outline-color": value }),
      });

      generateUtility({
        className: "ring",
        themeName: "ringColor",
        func(value) {
          if (!corePlugins("ringOpacity")) return { "--tw-ring-color": value };
          return withAlphaVariable({
            colour: value,
            property: "--tw-ring-color",
            variable: "--tw-ring-opacity",
          });
        },
      });

      generateUtility({
        className: "ring-offset",
        themeName: "ringOffsetColor",
        func: (value) => ({ "--tw-ring-offset-color": value }),
      });
    },
);
