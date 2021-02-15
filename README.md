# Tiny Towers

Final submission for PRIMA WS20

## Tools

The tooling uses the standard npm / yarn tooling with dependency management via the `package.json` file. The following
scripts are registered:

-   `dev`: Build the source for development
-   `build`: Build the source for production
-   `watch`: Build the source for development while watching for file changes

### Linting

For code linting I use `eslint` with the additional `@typescript-eslint` plugin / parser. Note: `tslint` was deprecated in 2019. Configuration is done via `.eslintrc.js` and `.eslintignore`. I use the following linting rules:

-   `eslint:recommended`
-   `plugin:@typescript-eslint/recommended`
-   `prettier`
-   `prettier/@typescript-eslint`

### Formatting

For code formatting I use `prettier`. Configuration is done via the `.prettierrc` file.

### Building

I use rollup (with various plugins) for building the source for either development or production. Configuration is done via `rollup.config.dev.js` and `rollup.config.prod.js` which both respect the `tsconfig.json` file.

## Build from source

To build from source first install all dependencies via `yarn / yarn install`. Then either choose the production or development build via the above mentioned scripts.
