import type { ColourObject, FlattenPalette } from "$types";

const flattenPalette: FlattenPalette = (colours) => {
  const entries: [string, ReturnType<FlattenPalette>[string]][] = [];
  function flatten(colours: ColourObject, curPalette: string[]) {
    for (const [key, val] of Object.entries(colours)) {
      if (typeof val === "object") {
        flatten(val, curPalette.concat(key));
        continue;
      }
      if (["inherit", "currentColor", "transparent"].includes(val)) continue;
      if (key === "50") continue;
      entries.push([
        (key === "DEFAULT" ? curPalette : curPalette.concat(key)).join("-"),
        [curPalette.join("."), key],
      ]);
    }
  }
  flatten(colours ?? {}, []);
  return Object.fromEntries(entries);
};

export default flattenPalette;
