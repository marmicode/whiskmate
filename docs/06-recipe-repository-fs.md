# Setup

```sh
git checkout origin/nodejs-11-recipe-repository-fs-boilerplate

yarn
```

# 🎯 Goal: Implement `RecipeRepositoryFilesystem`

- Create a file for each recipe.
- Recipe's folder path is given to the `RecipeRepositoryFilesystem` constructor.

# 📝 Steps

1. Run tests: `yarn test:watch` (or `npm run test:watch`).

2. Uncomment block in `describe.each`.

3. Make tests pass.

# 🎁 Tips

## Useful functions

- `fs.readFile()` reads a file.
- `fs.writeFile()` writes a file.
- `fs.readdir()` lists files in a folder.
- `fs.rm()` removes a file.
- `path.join()` joins file paths properly.

## Handle file not found error

You can know if an error happened because the file doesn't exist using the `error.code` property:

```ts
if (e?.code === 'ENOENT') {
  console.log('File not found');
}
```

## Async `Array.map`

`Array.map` is synchronous but it can be combined with `Promise.all` to implement an async `map`:

```ts
const results = await Promise.all(
  items.map(async (item) => {
    // Do the async stuff
  })
);
```
