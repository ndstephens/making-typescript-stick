# Template Literal Types

Like `template strings` in JavaScript, but for types.

Here used with a `mapped type` for consistent and concise string literal types for keys:

```ts
type Statistics = {
  [K in `${'median' | 'mean'}Value`]?: number;
};
const stats: Statistics = {};
stats.meanValue;
stats.medianValue;
```

---

<br>

## Can use type _"wildcards"_ to build strings

```ts
let winFns: Extract<keyof Window, `set${string}`> = '' as any;
// let winFns: "setInterval" | "setTimeout"
```

<br>

Another example of filtering by _key_ using template literal types:

```ts
type DocKeys = Extract<keyof Document, `query${string}`>;

type KeyFilteredDoc = {
  [K in DocKeys]: Document[K];
};
// type KeyFilteredDoc = {
//     queryCommandEnabled: (commandId: string) => boolean;
//     queryCommandState: (commandId: string) => boolean;
//     queryCommandSupported: (commandId: string) => boolean;
//     queryCommandValue: (commandId: string) => string;
//     querySelector: {
//         ...;
//     };
//     querySelectorAll: {
//         ...;
//     };
// }
```

---

<br>

## Utility types for changing case

```ts
type T1 = `send${Capitalize<'mouse' | 'keyboard'>}Event`;
// type T1 = 'sendMouseEvent' | 'sendKeyboardEvent';

type T2 = `send${Uppercase<'mouse' | 'keyboard'>}Event`;
// type T2 = 'sendMOUSEEvent' | 'sendKEYBOARDEvent';

type T3 = `send${Lowercase<'Mouse' | 'keyBoard'>}Event`;
// type T3 = 'sendmouseEvent' | 'sendkeyboardEvent';
```

---

<br>

## Key (re)mapping w/ Mapped Types and Template Literal Types

We now have some new syntax (note the `as` in the example below) that lets us transform keys in a declarative way.

This language feature works quite nicely with template literal types.

```ts
type Colors = 'red' | 'green' | 'blue';
type ColorSelector = {
  [K in Colors as `select${Capitalize<K>}`]: () => void;
};
const cs: ColorSelector = {} as any;
cs.selectRed();
cs.selectGreen();
cs.selectBlue();
```

<br>

Another example:

```ts
interface DataState {
  digits: number[];
  names: string[];
  flags: Record<'darkMode' | 'mobile', boolean>;
}
// Record equates to:
// type DataState['flags`] = {
//   darkMode: boolean;
//   mobile: boolean;
// }

// Create a custom type using mapped types and template literal types
// Here we're creating a type to represent `setter` methods of all the `DataState` properties
type DataSDK = {
  // The mapped type
  [K in keyof DataState as `set${Capitalize<K>}`]: (arg: DataState[K]) => void;
};

// Using the new type
function load(dataSDK: DataSDK) {
  dataSDK.setDigits([14]);
  dataSDK.setNames(['Joe', 'Jane']);
  dataSDK.setFlags({ darkMode: true, mobile: false });
}
```
