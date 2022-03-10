## How to run on locally (MAC OS):
Step 1: Install Dependencies
    - $ npm install

Step 2: Download the `template.csv` file and place it in the template folder
Step 3: Open the command prompt and run the following commands:
    - Run with the default config and generate 1 item
        $ node generateBatchOrderFileNewBooking.js

    - Run with a config file and generate multiple items
        $ node generateBatchOrderFileNewBooking.js --noItems=5
        $ node generateBatchOrderFileNewBooking.js --noItems=5 --config=config.js
        $ node generateBatchOrderFileNewBooking.js --noItems=5 --config=config-PHP-KN.js ( FOR KN )


### Config
With same pickup and dropoff and times
    - copy the config.js file and save with config.same-pu-do-times.js
    - set 2 toogles to true
        * GEN_MODE > TOGGLE_USE_ONLY_ONE_PICKUP: true,
        * GEN_MODE > TOGGLE_USE_ONLY_ONE_DROPOFF: true,
    - $ node generateBatchOrderFileNewBooking.js --noItems=5 --config=config.same-pu-do-times.js

With same Package Type As Container
    - set the togles to true
        * GEN_MODE > TOGGLE_USE_ONLY_PACKAGE_TYPE_AS_CONTAINER: true

You can copy the config.js file and update the corresponding data


Release Note:
- 1.0.0: Creating the batch file for Singapore companies
