export type { CSSRuleObject } from "tailwindcss/types/config";

export type ColourObject = {
  [key: string]: string | ColourObject;
};

export type ColourInfo = [string, string];

export type FlattenedObject = {
  [key: string]: ColourInfo;
};
