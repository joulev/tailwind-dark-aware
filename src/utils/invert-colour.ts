import Color from "color";

export default function invertColour(colour: string): string {
  const parsed = Color(colour);
  const alpha = parsed.alpha();
  const [h, s, l] = Color(colour).hsl().array();
  const inverted = Color.hsl(h, s, 100 - l).alpha(alpha);
  return (alpha === 1 ? inverted.hex() : inverted.hexa()).toLowerCase();
}
