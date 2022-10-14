import type { CSSRuleObject } from "tailwindcss/types/config";

export type ColourObject = {
  [key: string]: string | ColourObject;
};

export type ColourInfo = [string, string];

export type FlattenedObject = {
  [key: string]: ColourInfo;
};

export { type CSSRuleObject };

export type GenerateUtilsProps = {
  className: string;
  cssSelector?: string;
  cssProp: string | string[];
  themeName: string;
  opacityPlugin?: string;
  opacityVar?: string;
  customCSS?: CSSRuleObject;
};
