export type ColourObject = {
  [key: string]: string | ColourObject;
};

export type FlattenPalette = (colours: ColourObject | undefined) => {
  [key: string]: [string, string];
};
