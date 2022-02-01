# Duck typing

Not sure what the purpose of this is,
but something that can cause some headache if you don't understand it.

This is the same when you are using interfaces.

Coming from C# this is very confusing at first,
with [Enable type parameter lower-bound syntax (#14520)](https://github.com/microsoft/TypeScript/issues/14520) this should be solved.

I see a lot of benefits from duck typings in this case,
just in more cases I want to be specific in types.

### Correct, we are happy with this:
The problem is that `Test1Options` is required to have content to be able to inherit it.

```ts
class Test1Options {
    a: number
}
class Test1<T extends Test1Options> {
    options: T
}

class MyTest1Options {}
// Type 'MyTest1Options' does not satisfy the constraint 'Test1Options'.
//  Property 'a' is missing in type 'MyTest1Options' but required in type 'Test1Options'.ts(2344)
class MyTest1 extends Test1<MyTest1Options> {}
```

### Incorrect, but compiles:
Would expect that `MyTest2Options` is required to inherit `Test2Options`,
but since the object is empty Typescript doesn't care.

```ts
class Test2Options {}
class Test2<T extends Test2Options> {
    options: T
}

class MyTest2Options {}
class MyTest2 extends Test2<MyTest2Options> {}
```
