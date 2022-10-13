import * as plugin from "tailwindcss/plugin";
import { flattenColourPalette } from "./utils";

export = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "text-wd": (value: string | [string, string]) => {
        if (typeof value === "string") return { color: value };
        const [palette, shade] = value;
        return {
          color:
            palette === "" ? theme(`textColor.${shade}`) : theme(`textColor.${palette}.${shade}`),
        };
      },
    },
    { values: flattenColourPalette(theme("textColor")), type: ["color", "any"] },
  );
});
