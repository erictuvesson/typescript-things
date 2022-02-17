> "A void function returns undefined. A Promise<void> resolves to an undefined . ... This means that typescript will disregard the return value of the function when defining the type. Think of it as if the user don't expect a value, so returning a value should still work fine and not break the code."

### Simple:
```ts
// Valid
async function methodName(): Promise<void> {}
```

### Inheritance:
```ts
interface IKlass {
    methodName(): Promise<void>
}

// Not valid
class NotValid implements IKlass {
    // A function whose declared type is neither 'void' nor 'any' must return a value.ts(2355)
    methodName(): Promise<void> {}
}

// Valid
class Valid implements IKlass {
    methodName(): Promise<void> { return }
}
```

### Missing warning
#### Valid:
```ts
function asyncFunc() {
    return new Promise<{ status: string }>(function(resolve,reject) {
        resolve({ status: 'ACTIVE' })
    })
}

async function invokeTest() {
    let table = asyncFunc();
    if (!table) return;
    // Property 'status' does not exist on type 'Promise<void | { status: string; }>'.ts(2339)
    // WARNING: Did you forget to use 'await'?
    else if (table.status === 'ACTIVE') return table;
}
```

#### Invalid:
Adding ` | void` to the `asyncFunc` removes the warning.

```ts
function asyncFunc() {
    return new Promise<{ status: string } | void>(function(resolve,reject) {
        resolve({ status: 'ACTIVE' })
    })
}

async function invokeTest() {
    let table = asyncFunc();
    if (!table) return;
    // Property 'status' does not exist on type 'Promise<void | { status: string; }>'.ts(2339)
    else if (table.status === 'ACTIVE') return table;
}

```
