import __Colour from "color";
import type { WithAlphaVariable } from "$types";

function Colour(colour: string) {
  try {
    return __Colour(colour);
  } catch {
    return undefined;
  }
}

function formatColour(colour: __Colour, alpha: string) {
  const { r, g, b } = colour.rgb().object();
  // @ts-ignore
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

export function withAlphaValue(colour: string, alphaValue: number, defaultValue: string) {
  const parsed = Colour(colour);
  if (!parsed) return defaultValue;
  return formatColour(parsed, alphaValue.toString());
}

export const withAlphaVariable: WithAlphaVariable = ({ colour, property, variable }) => {
  const properties = Array.isArray(property) ? property : [property];
  const parsed = Colour(colour);
  if (!parsed || parsed.alpha() !== 1)
    return Object.fromEntries(properties.map((prop) => [prop, colour]));
  return {
    [variable]: "1",
    ...Object.fromEntries(
      properties.map((prop) => [prop, formatColour(parsed, `var(${variable})`)]),
    ),
  };
};
