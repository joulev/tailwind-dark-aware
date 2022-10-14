import type { CSSRuleObject } from "$types";
import Color from "color";

// https://github.com/tailwindlabs/tailwindcss/blob/a8a2e2a7191fbd4bee044523aecbade5823a8664/src/util/withAlphaVariable.js#L17
function colourToCSSWithoutDark(
  colour: string,
  properties: string[],
  variable?: string,
): CSSRuleObject {
  if (!variable) return Object.fromEntries(properties.map((prop) => [prop, colour]));
  const parsed = Color(colour);
  if (!parsed || parsed.alpha() !== 1)
    return Object.fromEntries(properties.map((prop) => [prop, colour]));
  // @ts-ignore
  const css = `${parsed.model}(${parsed.array().join(" ")} / var(${variable}))`;
  return {
    [variable]: "1",
    ...Object.fromEntries(properties.map((prop) => [prop, css])),
  };
}

export default function colourToCSS(
  colour: string | [string, string],
  selector: string,
  property: string | string[],
  variable: string | undefined,
  customCSS?: CSSRuleObject,
): CSSRuleObject {
  const properties = Array.isArray(property) ? property : [property];
  if (typeof colour === "string")
    return {
      [selector]: {
        ...colourToCSSWithoutDark(colour, properties, variable),
        ...customCSS,
      },
    };
  return {
    [selector]: {
      ...colourToCSSWithoutDark(colour[0], properties, variable),
      ...customCSS,
    },
    "@media (prefers-color-scheme: dark)": {
      [selector]: {
        ...colourToCSSWithoutDark(colour[1], properties, variable),
        ...customCSS,
      },
    },
  };
}
