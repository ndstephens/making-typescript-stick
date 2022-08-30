# Checked Index Access

There's a danger in creating an `indexed access type` without explicitly stating that all property values might be `undefined`.

```ts
type Dict<T> = { [K: string]: T };

const invoice: Dict<number> = {};
invoice.amount.toFixed(); // <- ERROR: `amount` may not exist, could be `undefined`
```

<br>

Best to always state that the value could be `undefined` to provide TS error checking:

```ts
type Dict<T> = { [K: string]: T | undefined }; // <- change to `T | undefined`

const invoice: Dict<number> = {};
invoice.amount.toFixed(); // <- ERROR
// Error: Object is possibly 'undefined'.
```

<br>

## `noUncheckedIndexAccess` - Compiler Flag

TypeScript now gives us a compiler flag that will do this for us: `noUncheckedIndexAccess`.
