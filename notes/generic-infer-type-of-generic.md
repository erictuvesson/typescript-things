Let's play around with a few different concepts

> This also seems to create an issue with VSCode auto complete,
> since it wont try to auto complete the options type.

### Success:
```ts
class TestOptions {}
class Test<T extends TestOptions> {
    options: T
}

function func<
    T1 extends Test<T2>,
    T2 extends TestOptions = T1 extends Test<infer T> ? T : never
>(options: T2) {}

class MyTestOptions extends TestOptions { value: string }
class MyTest extends Test<MyTestOptions> {}

func<MyTest, MyTestOptions>({ value: 'Hello World' }) // ugly
func<MyTest>({ value: 'Hello World' }) // nice
```

### Failure (Incorrect type):
Is this a bug?

```ts
class TestOptions {}
class Test<T extends TestOptions> {
// When not using T in here it will break the type
//    options: T
}

function func<
    T1 extends Test<T2>,
    T2 extends TestOptions = T1 extends Test<infer T> ? T : never
>(options: T2) {}

class MyTestOptions extends TestOptions { value: string }
class MyTest extends Test<MyTestOptions> {}

func<MyTest, MyTestOptions>({ value: 'Hello World' }) // ugly
// So this type will become func<MyTest, TestOptions> which is incorrect
// when we want it to be func<MyTest, MyTestOptions>
func<MyTest>({ value: 'Hello World' }) // nice
```
