import type { NextPage } from "next";
import { useEffect, useState } from "react";
import SideBySide from "../components/side-by-side";

const Home: NextPage = () => {
  const [isDark, setIsDark] = useState(false);
  const toggle = () => setIsDark((isDark) => !isDark);
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);
  return (
    <div className="pb-24">
      <div className="container mx-auto sticky top-0 bg-daw-stone-50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-12 mt-0 mb-24 border-b border-daw-stone-300">
          <h1 className="text-center sm:text-left">tailwind-dark-aware</h1>
          <div className="flex flex-row gap-3">
            <a
              href="https://github.com/joulev/tailwind-dark-aware"
              className="px-6 py-2 border border-daw-emerald-700 text-daw-emerald-700 hover:underline rounded-lg"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <button
              className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg"
              onClick={toggle}
            >
              Toggle&nbsp;dark
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-24">
        <SideBySide
          title="Divide colour"
          oldClasses="divide-red-700 dark:divide-red-300"
          newClasses="divide-daw-red-700"
          className="flex flex-row [&_div]:px-3 -ml-3 divide-x-4"
        >
          <div>hello</div>
          <div>world</div>
          <div>this</div>
          <div>is</div>
          <div>flexbox</div>
        </SideBySide>

        <SideBySide
          title="Border colour"
          oldClasses="border-red-700 dark:border-red-300"
          newClasses="border-daw-red-700"
          className="border-4 h-12"
        />

        <SideBySide
          title="Background colour"
          oldClasses="bg-red-200 dark:bg-red-800"
          newClasses="bg-daw-red-200"
          className="h-12"
        />

        <SideBySide
          title="Gradient colour"
          oldClasses="from-red-200 via-green-200 to-blue-200 dark:from-red-800 dark:via-green-800 dark:to-blue-800"
          newClasses="from-daw-red-200 via-daw-green-200 to-daw-blue-200"
          className="h-12 bg-gradient-to-r"
        />

        <SideBySide
          title="Gradient colour (with transparency)"
          oldClasses="from-red-200 dark:from-red-800"
          newClasses="from-daw-red-200"
          className="h-12 bg-gradient-to-r"
        />

        <SideBySide
          title="SVG fill colour"
          oldClasses="[&_svg_rect]:fill-red-200 [&_svg_rect]:dark:fill-red-800"
          newClasses="[&_svg_rect]:fill-daw-red-200"
          trimStart="[&_svg_rect]:"
          className="h-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" className="h-12">
            <rect x="0" y="0" width="200" height="48" rx="12" ry="12" />
          </svg>
        </SideBySide>

        <SideBySide
          title="SVG stroke colour"
          oldClasses="[&_svg_rect]:stroke-red-700 [&_svg_rect]:dark:stroke-red-300"
          newClasses="[&_svg_rect]:stroke-daw-red-700"
          trimStart="[&_svg_rect]:"
          className="h-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" className="h-12">
            <rect x="2" y="2" width="196" height="44" rx="12" ry="12" strokeWidth={4} fill="none" />
          </svg>
        </SideBySide>

        <SideBySide
          title="Text colour"
          oldClasses="text-red-700 dark:text-red-300"
          newClasses="text-daw-red-700"
          className="text-3xl font-bold"
        >
          hello world
        </SideBySide>

        <SideBySide
          title="Text decoration colour"
          oldClasses="decoration-red-700 dark:decoration-red-300"
          newClasses="decoration-daw-red-700"
          className="text-3xl font-bold underline underline-offset-4 decoration-4"
        >
          hello world
        </SideBySide>

        <SideBySide
          title="Placeholder colour"
          oldClasses="[&_input]:placeholder-red-700 [&_input]:dark:placeholder-red-300"
          newClasses="[&_input]:placeholder-daw-red-700"
          trimStart="[&_input]:"
          className="text-3xl font-bold"
        >
          <input
            type="text"
            placeholder="hello world"
            className="w-full bg-daw-white focus:outline-none"
          />
        </SideBySide>

        <SideBySide
          title="Caret colour"
          oldClasses="[&_input]:caret-red-700 [&_input]:dark:caret-red-300"
          newClasses="[&_input]:caret-daw-red-700"
          trimStart="[&_input]:"
          className="text-3xl font-bold"
        >
          <input
            type="text"
            placeholder="focus this input"
            className="w-full bg-daw-white placeholder-daw-stone-300 focus:outline-none"
          />
        </SideBySide>

        <SideBySide
          title="Accent colour"
          oldClasses="[&_input]:accent-red-700 [&_input]:dark:accent-red-300"
          newClasses="[&_input]:accent-daw-red-700"
          trimStart="[&_input]:"
        >
          <label>
            <input type="checkbox" defaultChecked /> Checkbox
          </label>
        </SideBySide>

        <SideBySide
          title="Box shadow colour"
          oldClasses="shadow-red-200 dark:shadow-red-800"
          newClasses="shadow-daw-red-200"
          className="h-12 shadow-xl"
        />

        <SideBySide
          title="Outline colour"
          oldClasses="outline-red-700 dark:outline-red-300"
          newClasses="outline-daw-red-700"
          className="h-12 outline outline-4"
        />

        <SideBySide
          title="Ring colour and ring offset colour"
          oldClasses="ring-red-700 ring-offset-blue-700 dark:ring-red-300 dark:ring-offset-blue-300"
          newClasses="ring-daw-red-700 ring-offset-daw-blue-700"
          className="h-12 ring-4 ring-offset-4"
        />
      </div>
    </div>
  );
};

export default Home;
