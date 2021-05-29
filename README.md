# cypress4qa

## Installing typescript, cypress

    $ yarn add typescript

    $ yarn add cypress --dev

## Opening cypress

    $ yarn run cypress open

    The cypress.json file and the cypress folder are created.

## Cleanup and Update extension files (ignore this step, just do this step one time for initializing project)

    Let's remove
        * example.json under cypress/fixtures
        * examples folder under cypress/integration
        * commands.js under cypress/support
    
    Let's update the extension of files *.js to *.ts
        * cypress/plugins/index.ts
        * cypress/support/index.ts

