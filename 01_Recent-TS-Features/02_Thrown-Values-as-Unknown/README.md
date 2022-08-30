# Thrown Values as `unknown`

Before TS 4.0, thrown values were always considered to be of type `any`.

Now, we can choose to regard it as of type `unknown`.

You should always type errors as `unknown`.

```ts
try {
  somethingRisky();
} catch (err: unknown) {
  if (err instanceof Error) throw err;
  else throw new Error(`${err}`);
}
```

<br>

## Compiler Option

There’s also a `useUnknownInCatchVariables` `compilerOption` flag that will make thrown values unknown across your entire project
