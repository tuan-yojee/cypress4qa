# cypress4qa

## Initializing project (ignore this step, just do this step one time for initializing project)

* Installing typescript, cypress.

        $ yarn add --dev typescript

        $ yarn add --dev cypress

* Opening cypress

        $ yarn run cypress open

        the cypress.json file and the cypress folder are created.

* Cleanup and update extension files

        Let's remove
            * example.json under cypress/fixtures
            * examples folder under cypress/integration
            * commands.js under cypress/support

        Let's update the extension of files *.js to *.ts
            * cypress/plugins/index.ts
            * cypress/support/index.ts

* create a tsconfig.json https://docs.cypress.io/guides/tooling/typescript-support#Configure-tsconfig-json

        {
            "compilerOptions": {
                "target": "es5",
                "lib": ["es5", "dom"],
                "types": ["cypress"]
            },
            "include": ["**/*.ts"]
        }

Notice `"types": ["cypress"]`, we are defining types. This is the exact thing as adding `/// <reference types="cypress" />` at the beginning of your file to make autocomplete work. With TypeScript, you don’t need to do that, because it will be enabled globally.

---
## Install all the dependencies listed within package.json in the local node_modules folder.

* Install

        $ yarn install

* Opening cypress ( optional )

        $ yarn run cypress open

* Run:

        $ yarn run cypress run --browser chrome
