import plugin from "tailwindcss/plugin";
import colourToCSS from "./utils/colour-to-css";
import invertColour from "./utils/invert-colour";
import flattenPalette from "./utils/flatten-palette";
import getInvertInPalette from "./utils/get-invert-in-palette";
import defaultOptions from "./default-options";
import type { ColourObject, ColourInfo, GenerateUtilsProps, Options } from "$types";

export = plugin.withOptions<Partial<Options>>(
  (userOptions = {}) =>
    ({ matchUtilities, theme, corePlugins }) => {
      const options: Options = { ...defaultOptions, ...userOptions };

      function generateUtility({
        className,
        cssSelector = "&",
        cssProp,
        themeName,
        opacityPlugin,
        opacityVar,
        customCSS,
      }: GenerateUtilsProps) {
        matchUtilities(
          {
            [`${className}-${options.suffix}`]: (value: string | ColourInfo) => {
              const cssOpacityVar =
                opacityPlugin && corePlugins(opacityPlugin) ? opacityVar : undefined;

              if (typeof value === "string")
                return colourToCSS(
                  options,
                  options.invertCustomColours ? [value, invertColour(value)] : value,
                  cssSelector,
                  cssProp,
                  cssOpacityVar,
                  customCSS,
                );

              const [palette, shade] = value;
              const prefix = palette === "" ? themeName : `${themeName}.${palette}`;
              const current = theme<string>(`${prefix}.${shade}`);

              if (shade === "DEFAULT")
                return colourToCSS(
                  options,
                  options.invertDefaultColours ? [current, invertColour(current)] : current,
                  cssSelector,
                  cssProp,
                  cssOpacityVar,
                  customCSS,
                );

              const invert = getInvertInPalette(options, theme<ColourObject>(prefix), shade);
              return colourToCSS(
                options,
                [current, invert],
                cssSelector,
                cssProp,
                cssOpacityVar,
                customCSS,
              );
            },
          },
          { values: flattenPalette(options, theme(themeName)), type: ["color"] },
        );
      }

      generateUtility({
        className: "divide",
        cssSelector: "& > :not([hidden]) ~ :not([hidden])",
        cssProp: "border-color",
        themeName: "divideColor",
        opacityPlugin: "divideOpacity",
        opacityVar: "--tw-divide-opacity",
      });

      generateUtility({
        className: "border",
        cssProp: "border-color",
        themeName: "borderColor",
        opacityPlugin: "borderOpacity",
        opacityVar: "--tw-border-opacity",
      });
      generateUtility({
        className: "border-x",
        cssProp: ["border-left-color", "border-right-color"],
        themeName: "borderColor",
        opacityPlugin: "borderOpacity",
        opacityVar: "--tw-border-opacity",
      });
      generateUtility({
        className: "border-y",
        cssProp: ["border-top-color", "border-bottom-color"],
        themeName: "borderColor",
        opacityPlugin: "borderOpacity",
        opacityVar: "--tw-border-opacity",
      });
      for (const side of ["top", "right", "bottom", "left"]) {
        generateUtility({
          className: `border-${side.substring(0, 1)}`,
          cssProp: `border-${side}-color`,
          themeName: "borderColor",
          opacityPlugin: "borderOpacity",
          opacityVar: "--tw-border-opacity",
        });
      }

      generateUtility({
        className: "bg",
        cssProp: "background-color",
        themeName: "backgroundColor",
        opacityPlugin: "backgroundOpacity",
        opacityVar: "--tw-bg-opacity",
      });

      generateUtility({
        className: "text",
        cssProp: "color",
        themeName: "textColor",
        opacityPlugin: "textOpacity",
        opacityVar: "--tw-text-opacity",
      });

      generateUtility({
        className: "decoration",
        cssProp: "text-decoration-color",
        themeName: "textDecorationColor",
      });

      generateUtility({
        className: "placeholder",
        cssSelector: "&::placeholder",
        cssProp: "color",
        themeName: "placeholderColor",
        opacityPlugin: "placeholderOpacity",
        opacityVar: "--tw-placeholder-opacity",
      });

      generateUtility({
        className: "caret",
        cssProp: "caret-color",
        themeName: "caretColor",
      });

      generateUtility({
        className: "accent",
        cssProp: "accent-color",
        themeName: "accentColor",
      });

      generateUtility({
        className: "shadow",
        cssProp: "--tw-shadow-color",
        themeName: "boxShadowColor",
        customCSS: { "--tw-shadow": "var(--tw-shadow-colored)" },
      });

      generateUtility({
        className: "outline",
        cssProp: "outline-color",
        themeName: "outlineColor",
      });

      generateUtility({
        className: "ring",
        cssProp: "--tw-ring-color",
        themeName: "ringColor",
        opacityPlugin: "ringOpacity",
        opacityVar: "--tw-ring-opacity",
      });

      generateUtility({
        className: "ring-offset",
        cssProp: "--tw-ring-offset-color",
        themeName: "ringOffsetColor",
      });
    },
);
