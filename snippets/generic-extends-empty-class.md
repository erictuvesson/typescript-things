
### Error:
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

### Success:
```ts
class Test2Options {}
class Test2<T extends Test2Options> {
    options: T
}

class MyTest2Options {}
class MyTest2 extends Test2<MyTest2Options> {}
```
