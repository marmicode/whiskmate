# Setup

## 📦 Install stuff

### Install git `>= 2.23`

https://git-scm.com/downloads

:::warning
Make sure to pick a git version `>= 2.23`
:::

### Install NodeJS `>=22.12.0`

:::warning
Make sure to pick a NodeJS version `>=22.12.0`
:::

https://nodejs.org/en/download

### Install pnpm

https://pnpm.io/installation

```sh
corepack enable
```

or if you are using [Volta](https://volta.sh/)

```sh
volta install pnpm
```

## 📥 Retrieve source code and install dependencies

```sh
git clone https://github.com/marmicode/whiskmate.git --branch pragmatic-angular-testing

cd whiskmate

pnpm install
```

## ⌨️ Cook CLI

The `cook` CLI allows you to cook exercises:

- select an exercise from a list
- checkout the implementation when the test is ready _(♻️ TDD mode)_
- go to the solution

```sh
pnpm cook
```

## 📖 Tips

### Choose a test runner

- [Vitest](https://vitest.dev/) _(default and recommended)_
- [Jest](https://jestjs.io/)

By default, this workspace uses Vitest, but you can downgrade to Jest if you prefer:

```sh
# You will have to run this command each time you reset your local changes
pnpm downgrade-to-jest
```

_Note that the solutions are compatible with both test runners._
