import { ignoredColours } from "./constants";
import type { ColourObject, FlattenedObject, Options } from "$types";

export default function flattenPalette(
  options: Options,
  colours: ColourObject | undefined,
): FlattenedObject {
  const entries: [string, FlattenedObject[string]][] = [];
  function flatten(colours: ColourObject, curPalette: string[]) {
    for (const [key, val] of Object.entries(colours)) {
      if (typeof val === "object") {
        flatten(val, curPalette.concat(key));
        continue;
      }
      if (ignoredColours.includes(val)) continue;
      if (options.ignoredKeys.includes(key)) continue;
      entries.push([
        (key === "DEFAULT" ? curPalette : curPalette.concat(key)).join("-"),
        [curPalette.join("."), key],
      ]);
    }
  }
  flatten(colours ?? {}, []);
  return Object.fromEntries(entries.filter(([key]) => key !== ""));
}
