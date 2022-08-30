# Variadic Tuple Types

Already possible to use a `...rest[]` as the last element of a tuple.

```ts
// Worked this way, even before TS 4.x
enum Sandwich {
  Hamburger,
  VeggieBurger,
  GrilledCheese,
  BLT,
}
type SandwichOrder = [
  number, // order total
  Sandwich, // sandwich
  ...string[] // toppings
];

const order1: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce'];
const order2: SandwichOrder = [14.99, Sandwich.Hamburger, 'avocado', 'cheese'];
```

<br>

It has even been possible to use generics for that spread type at the end of the tuple.

```ts
// Worked this way, even before TS 4.x
type MyTuple<T> = [number, ...T[]];

const x1: MyTuple<string> = [4, 'hello', 'foo'];
const x2: MyTuple<boolean> = [4, true];
```

<br>

However the generic could not instead be written the following way:

```ts
type MyTuple<T extends any[]> = [number, ...T]; // <- ERROR w/ `...T`
```

<br>

## Why does this matter?

We'd lose type information when pulling out that spread.

It'd be typed as an `array`, no longer as a `tuple`.

```ts
const order1: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce'];

/**
 * return an array containing everything except the first element
 */
function tailOfOrder<T>(arg: readonly [number, ...T[]]) {
  const [_ignoreOrderAmountValue, ...rest] = arg;
  return rest;
}

const orderWithoutTotal = tailOfOrder(order1);
// const orderWithoutTotal: (string | Sandwich)[];  <- array, not tuple
```

<br>

## The Fix

TS 4.0 introduces support for `variadic tuples`.

This relaxes the limitation shown above, and allows us to use `...T` in tuple types.

Going back to our `tailOfOrder` example, let’s make a small change:

```ts
-function tailOfOrder<T>(arg: readonly [number, ...T[]]) {

+function tailOfOrder<T extends any[]>(arg: readonly [number, ...T]) {
  const [_ignoreOrderAmountValue, ...rest] = arg;
  return rest;
}
```

<br>

Now we retain the tuple type in the return of our function:

```ts
const order1: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce'];

/**
 * return an array containing everything except the first element
 */
function tailOfOrder<T extends any[]>(arg: readonly [number, ...T]) {
  // ^^^ The change!!
  const [_ignoreOrderAmountValue, ...rest] = arg;
  return rest;
}

const result = tailOfOrder(order1);
// const result: [Sandwich, ...string[]];  <- return tuple type
```

---

<br>

## More Tuple Updates:

### Use more than one tuple `...spread` in a single tuple

```ts
type MyTuple = [...[number, number], ...[string, string, string]];

const x: MyTuple = [1, 2, 'a', 'b', 'c'];
// const x: [number, number, string, string, string];
```

<br>

### Only one `...rest[]` element is possible in a tuple, but doesn't have to be last element

```ts
type YEScompile1 = [...[number, number], ...string[]];
type NOcompile1 = [...number[], ...string[]]; // <- ERROR
// Error: A rest element cannot follow another rest element.

type YEScompile2 = [boolean, ...number[], string]; // <- in the middle
```
