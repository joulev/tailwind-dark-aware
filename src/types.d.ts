export type ColourObject = {
  [key: string]: string | ColourObject;
};

export type FlattenedColourPalette = (colours: ColourObject | undefined) => {
  [key: string]: [string, string];
};
