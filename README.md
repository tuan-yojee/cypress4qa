# cypress4qa

## Javascript

Type below command on the terminal under your project directory:

`$ npm init`

`$ npm install cypress --save-dev`

The basis of the Cypress Test is [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) (one of the famous assertion libraries in JavaScript)

How to open Cypress to run Cypress Test?

`$ node_modules/.bin/cypress open`

or

`$ (npm bin)/cypress open`

or

`$ npx cypress open`


---
## Typescript

Install yarn via npm. `$ npm install --global yarn`

Add sudo with password is required if got error: `npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules`

Install yarn: `$ sudo npm install --global yarn`

Check yarn version: `$ yarn --version`

Install typescript: `$ yarn add typescript`

Create a tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress"]
  },
  "include": [
    "**/*.ts"
  ]
}
```


---
References:

- https://github.com/filiphric
- https://filiphric.com/