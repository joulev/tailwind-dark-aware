import type { CSSRuleObject, ExtendedOptions, GenerateUtilsProps } from "$types";

export default function colourToCSS(
  options: ExtendedOptions,
  colour: string | [string, string],
  f: GenerateUtilsProps["func"],
): CSSRuleObject {
  if (typeof colour === "string") {
    const css = f(colour);
    if (options.nonInvertBehaviour === "no-dark") return css;
    return {
      ...css,
      [options.darkModeSelector]: css,
    };
  }
  return {
    ...f(colour[0]),
    [options.darkModeSelector]: f(colour[1]),
  };
}
