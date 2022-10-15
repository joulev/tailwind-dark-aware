import type { CSSRuleObject } from "tailwindcss/types/config";
export { type CSSRuleObject };

export type ColourObject = {
  [key: string]: string | ColourObject;
};

export type ColourInfo = [string, string];

export type FlattenedObject = {
  [key: string]: ColourInfo;
};

export type WithAlphaVariable = (props: {
  colour: string;
  property: string | string[];
  variable: string;
}) => CSSRuleObject;

export type GenerateUtilsProps = {
  className: string;
  themeName: string;
  func: (value: string) => CSSRuleObject;
};

export type Options = {
  suffix: string;
  ignoredKeys: string[];
  invertDefaultColours: boolean;
  invertCustomColours: boolean;
  nonInvertBehaviour: "no-dark" | "same-dark";
};

export type ExtendedOptions = Options & {
  darkModeSelector: string;
};
