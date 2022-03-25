// Remove this if you are using Typescript 4.5 and above
// https://github.com/microsoft/TypeScript/blob/ca65a1a05bed7fbc59739548f169b9747be266e0/src/lib/es5.d.ts#L1498-L1507
type Awaited<T> =
    T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
        T extends object & { then(onfulfilled: infer F): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
            F extends ((value: infer V, ...args: any) => any) ? // if the argument to `then` is callable, extracts the first argument
                Awaited<V> : // recursively unwrap the value
                never : // the argument to `then` was not callable
        T; // non-object or non-thenable



type PromiseHash = Record<string, Promise<unknown>>;

type AwaitedPromiseHash<T extends PromiseHash> = {
  [P in keyof T]: Awaited<T[P]>;
};

export async function allObjects<T extends PromiseHash>(object: T): Promise<AwaitedPromiseHash<T>> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(object).map(async ([key, promise]) => {
        return [key, await promise];
      })
    )
  );
}



// This is just for showcase
async function example() {
  const { foo, bar } = await allObjects({
    foo: Promise.resolve(42),
    bar: Promise.resolve("hello")
  })
  const isNumber: number = foo
  const isString: string = bar
}
