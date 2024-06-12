import type { CSSRuleObject, ExtendedOptions, GenerateUtilsProps } from "$types";

// https://github.com/tailwindlabs/tailwindcss/blob/ff6f085da2afe4149ab2791b8b6b74836dbbba9f/src/lib/setupContextUtils.js#L58
function tailwind__parseVariantFormatString(input: string) {
  let parts: string[] = [];

  // When parsing whitespace around special characters are insignificant
  // However, _inside_ of a variant they could be
  // Because the selector could look like this
  // @media { &[data-name="foo bar"] }
  // This is why we do not skip whitespace

  let current = "";
  let depth = 0;

  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];

    if (char === "\\") {
      // Escaped characters are not special
      current += "\\" + input[++idx];
    } else if (char === "{") {
      // Nested rule: start
      ++depth;
      parts.push(current.trim());
      current = "";
    } else if (char === "}") {
      // Nested rule: end
      if (--depth < 0) {
        throw new Error(`Your { and } are unbalanced.`);
      }

      parts.push(current.trim());
      current = "";
    } else {
      // Normal character
      current += char;
    }
  }

  if (current.length > 0) {
    parts.push(current.trim());
  }

  parts = parts.filter((part) => part !== "");

  return parts;
}

// https://github.com/tailwindlabs/tailwindcss/blob/ff6f085da2afe4149ab2791b8b6b74836dbbba9f/src/lib/setupContextUtils.js#L225
function tailwind__parseVariant(variant: string) {
  variant = variant
    .replace(/\n+/g, "")
    .replace(/\s{1,}/g, " ")
    .trim();

  return tailwind__parseVariantFormatString(variant);
}

function produceCSSObject(selector: string, css: CSSRuleObject): CSSRuleObject {
  const parsedVariants = tailwind__parseVariant(selector);
  return parsedVariants.reduceRight((acc, variant) => ({ [variant]: acc }), css);
}

export default function colourToCSS(
  options: ExtendedOptions,
  colour: string | [string, string],
  f: GenerateUtilsProps["func"],
): CSSRuleObject {
  if (typeof colour === "string") {
    const css = f(colour);
    if (options.nonInvertBehaviour === "no-dark") return css;
    return Object.assign(
      { ...css },
      ...options.darkModeSelectors.map((selector) => produceCSSObject(selector, css)),
    );
  }
  return Object.assign(
    { ...f(colour[0]) },
    ...options.darkModeSelectors.map((selector) => produceCSSObject(selector, f(colour[1]))),
  );
}
