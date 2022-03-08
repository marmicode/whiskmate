# Setup

```sh
git checkout origin/nodejs-14-recipe-api

yarn
```

# 🎯 Goal: Add some type-safety

# 📝 Steps

1. Use `del`, `get`, `post` typed helpers from `src/helpers/typed-express.ts` to types and enjoy TypeScript inference:

```ts
post<{ name: string }, number>(recipesRouter)('/compute-age', (req, res) => {
  computeAge(req.body.name);
  res.send('42'); // ERROR TS2345: Argument of type '42' is not assignable to parameter of type 'number'.
});
```
