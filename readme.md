# tailwind-dark-aware

Tailwind CSS plugin to generate shorthands for light mode and dark mode colour classes.

![Branch status](https://img.shields.io/github/checks-status/joulev/tailwind-dark-aware/main?label=status&style=flat-square) ![Codecov](https://img.shields.io/codecov/c/gh/joulev/tailwind-dark-aware?style=flat-square)

---

## Demo app

**Deployment:** https://tailwind-dark-aware.vercel.app  
**Source:** https://github.com/joulev/tailwind-dark-aware/tree/main/demo

## Installation

```sh
npm install -D tailwind-dark-aware
```

Then add the plugin in your `tailwind.config.js` file:

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("tailwind-dark-aware"),
    // or if you want to call with options:
    require("tailwind-dark-aware")({
      // your options here
    }),
    // ...
  ],
};
```

## Basic usage

This plugin generates classes such as `text-daw-red-700` and `border-x-daw-emerald-200` that sets the colour dynamically in light mode and dark mode. The light mode version is the one you specify, while the dark mode is the opposite one in the same palette. Essentially, `text-daw-red-700` is equivalent to `text-red-700 dark:text-red-300` and `border-x-daw-emerald-200` is equivalent to `border-x-emerald-200 dark:border-x-emerald-800`.

Now you know how to use it: simply add `daw` (short for "dark aware") before the colour part of any Tailwind colour utility you use.

```jsx
// = bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100
() => <body className="bg-daw-stone-100 text-daw-stone-900">Hello world</body>;
```

A couple of things to note:

- By default, Tailwind colours of shade 50 are ignored (so you can't do `bg-daw-stone-50`). The reason being that Tailwind doesn't provide shade 950. You can [override this behaviour](#ignoredkeys).

- If you provide colour labeled with `DEFAULT`, by default your colour is kept intact (i.e. same colour in dark mode as in light mode). You can [change this behaviour](#invertdefaultcolours).

  ```jsx
  // tailwind.config.js
  {
    theme: {
      extend: {
        colors: {
          red: {
            DEFAULT: "#ff0000",
          },
        },
      },
    }
  }

  // Component.jsx
  () => <div className="text-daw-red" /> // = text-red dark:text-red
  ```

- If you provide a custom value (using the bracket notation), by default your colour is inverted with `(h, s, l) => (h, s, 100 - l)`. You can [choose to keep it intact instead](#invertcustomcolours).

  ```jsx
  () => <div className="text-daw-[#123456]" />; // = text-[#123456] dark:text-[#a9cbed]
  ```

## Customising

First of all, you need to call the plugin the way that Tailwind will expect options.

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("tailwind-dark-aware")({
      // your options here
    }),
    // ...
  ],
};
```

### `suffix`

**TypeScript type:** `string`  
**Default:** `daw`

This sets the suffix added to all colour utilities.

```jsx
require("tailwind-dark-aware")({ suffix: "my-suffix" })
() => <div className="text-my-suffix-red-300" /> // = text-red-300 dark:text-red-700
```

### `ignoredKeys`

**TypeScript type:** `string[]`  
**Default:** `["50"]`

The "shades" to be ignored.

To find the dark mode variant of a colour, `tailwind-dark-aware` sorts the palette by luminosity, then get the colour placed opposite to the colour in question.

With the default configuration (`["50"]`), this would mean `[100, 900]`, `[200, 800]`, `[300, 700]` and so on. However, if you change it to (say) `[]`, the pairing would become `[50, 900]`, `[100, 800]`, `[200, 700]`, etc. Therefore, you would probably not want to use this option.

```jsx
require("tailwind-dark-aware")({ ignoredKeys: ["400", "700"] })
// 50, 100, 200, 300, 500, 600, 800, 900
() => <div className="text-daw-red-200" /> // = text-red-200 dark:text-red-600
```

### `invertCustomColours`

**TypeScript type:** `boolean`  
**Default:** `true`

Whether to invert custom colours (provided by the bracket notation) or not. If set to `true`, the colour is inverted by "inverting" the luminosity while keeping the hue and saturation.

```jsx
require("tailwind-dark-aware")({ invertCustomColours: true })
() => <div className="text-daw-[#123456]" /> // = text-[#123456] dark:text-[#a9cbed]
```

```jsx
require("tailwind-dark-aware")({ invertCustomColours: false })
() => <div className="text-daw-[#123456]" /> // = text-[#123456] dark:text-[#123456]
```

### `invertDefaultColours`

**TypeScript type:** `boolean`  
**Default:** `false`

Whether to invert colour defined with `DEFAULT` key in `tailwind.config.js`. If set to `true`, the colour is inverted by "inverting" the luminosity while keeping the hue and saturation.

```jsx
// tailwind.config.js
{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#123456",
        },
      },
    },
  }
}
```

```jsx
require("tailwind-dark-aware")({ invertDefaultColours: true })
() => <div className="text-daw-primary" /> // = text-primary dark:text-[#a9cbed]
```

```jsx
require("tailwind-dark-aware")({ invertDefaultColours: false })
() => <div className="text-daw-primary" /> // = text-primary dark:text-primary
```

### `nonInvertBehaviour`

**TypeScript type:** `"same-dark" | "no-dark"`  
**Default:** `"same-dark"`

Specify what happens if a colour, either a `DEFAULT` colour or a custom colour, is not inverted.

`same-dark` means the declaration is also made for dark mode.

```jsx
require("tailwind-dark-aware")({ nonInvertBehaviour: "same-dark" })
() => <div className="text-daw-primary" /> // = text-primary dark:text-primary
```

`no-dark` does not declare for dark mode.

```jsx
require("tailwind-dark-aware")({ nonInvertBehaviour: "no-dark" })
() => <div className="text-daw-primary" /> // = text-primary
```
