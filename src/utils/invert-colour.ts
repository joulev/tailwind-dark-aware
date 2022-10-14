import Color from "color";

export default function invertColour(colour: string): string {
  const [h, s, l] = Color(colour).hsl().array();
  return Color.hsl(h, s, 100 - l)
    .hex()
    .toLowerCase();
}
