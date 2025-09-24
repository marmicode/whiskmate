# FAQ

## `wm-recipe-filter` is not a known element

This is a shallow test. We don't want to load child components as they are probably not even implemented yet.

Apply `CUSTOM_ELEMENTS_SCHEMA` to allow unknown elements:

```typescript
TestBed.overrideComponent(MyThing, {
  set: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});
```

## Not getting the expected result

- [ ] Did you wait for change detection to be triggered and the component to be stable `fixture.whenStable()`?
- [ ] Did you `await` all functions that return a promise? (e.g. harnesses)

## How to stub a function that returns an observable?

You can use `of` function to create a hardcoded observable.

```typescript
stub.mockReturnValue(of(42));
```
