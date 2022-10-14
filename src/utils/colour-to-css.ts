import type { CSSRuleObject } from "$types";

export default function colourToCSS(colour: string | [string, string]): CSSRuleObject {
  if (typeof colour === "string") return { color: colour };
  return {
    color: colour[0],
    "@media (prefers-color-scheme: dark)": {
      color: colour[1],
    },
  };
}
