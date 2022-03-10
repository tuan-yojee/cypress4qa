const fs = require('fs');
const papaparse = require('papaparse');
const fastcsv = require('fast-csv');
const moment = require('moment');

// HANDLING COMMAND LINE INPUT
const commandLineArgs = require('command-line-args');
const _OPTION_DEFINITIONS = [
  { name: 'noItems', alias: 'n', type: Number },
  { name: 'config', alias: 'c', type: String }
]
const _NO_ITEMS_WILL_BE_GENERATED = (!commandLineArgs(_OPTION_DEFINITIONS)['noItems']) ? 1 : commandLineArgs(_OPTION_DEFINITIONS)['noItems']
const _CONFIG_FILE_INPUT = (!commandLineArgs(_OPTION_DEFINITIONS)['config']) ? './config' : `./${commandLineArgs(_OPTION_DEFINITIONS)['config']}`
const _EMPTY_STRING = ''
const _ORDER_STRING = 'Order'
const _ITEM_DETAILS_STRING = 'Item Details'
const _CONTAINER_DETAILS_STRING = 'Container Details'
const { GEN_MODE, INPUT_FILES, FIELD, FIELD_VALUES } = require(_CONFIG_FILE_INPUT)
const _DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss'

/**
 * Step 1 - Read address_book_list from the address file template csv
 * Step 2 - Iterate to generate each item data and push to array
 *  Step 2.1 - Get data rows
 *  Step 2.2 - Update order details to data row
 *  Step 2.3 - Update item details to data row
 *  Step 2.4 - Update task details 1 - Leg 1 Pickup to data row
 *  Step 2.5 - Update task details 2 - Leg 1 Dropoff to data row
 *  Step 2.6 - Create item from order details, item details, task details 1 - Leg 1 Pickup, Update task details 2 - Leg 1 Dropoff
 *  Step 2.7 - Save item data to file
 */
const generateBatchUploadFileNewBooking = async () => {

  // Step 1 - Read address_book_list from the address file template csv
  const addresses_book_list = await readCSV(INPUT_FILES.CSV_ADDRESSES_BOOK_TEMPLATE_FILE)
  let csvTemplateData = (await readCSV(INPUT_FILES.CSV_TEMPLATE_FILE, false)).slice(0, 4)
  const LEGS_ROW = csvTemplateData[0] // LEGs
  const SECTION_ROW = csvTemplateData[1] // ORDER, ITEM DETAILS, TASK DETAILS 1, TASK DETAILS 2
  const FIELDS_ROW = csvTemplateData[2] // FIELD NAMES
  const ALL_LEGS = LEGS_ROW.filter(value => value.toLowerCase().includes('leg')) // get all legs from template file
  const ALL_TASK_DETAILS_IN_LEG = [...new Set(SECTION_ROW.filter(value => value.toLowerCase().includes('task details')))] // get all task details from template file

  // Step 2 - Iterate to generate each item data and push to array
  // time start
  let datetimeMoment = moment(new Date());

  let index = 0;
  do {
    let details = Array(FIELDS_ROW.length);
    // Update order details
    const externalOrderID = `${FIELD_VALUES.DEFAULT_ORDER_EXTERNAL_ID}_${datetimeMoment.format('HHmmss')}_${index}`
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ORDER_STRING, FIELD.ORDER_EXTERNAL_ID, externalOrderID)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ORDER_STRING, FIELD.ORDER_SERVICE_TYPE, FIELD_VALUES.DEFAULT_ORDER_SERVICE_TYPES[Math.floor(Math.random() * FIELD_VALUES.DEFAULT_ORDER_SERVICE_TYPES.length)])
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ORDER_STRING, FIELD.ORDER_PACKING_MODE, FIELD_VALUES.DEFAULT_ORDER_PACKING_MODES[Math.floor(Math.random() * FIELD_VALUES.DEFAULT_ORDER_PACKING_MODES.length)])
    // Update item details
    const packageType = GEN_MODE.TOGGLE_USE_ONLY_PACKAGE_TYPE_AS_CONTAINER ? 'Container' : FIELD_VALUES.DEFAULT_ITEM_PACKAGE_TYPES[Math.floor(Math.random() * (FIELD_VALUES.DEFAULT_ITEM_PACKAGE_TYPES.length - 1))]
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_PACKAGE_TYPE, packageType)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_QUANTITY, FIELD_VALUES.DEFAULT_ITEM_QUANTITY)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_WEIGHT, FIELD_VALUES.DEFAULT_ITEM_WEIGHT)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_LENGTH, FIELD_VALUES.DEFAULT_ITEM_LENGTH)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_WIDTH, FIELD_VALUES.DEFAULT_ITEM_WIDTH)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_HEIGHT, FIELD_VALUES.DEFAULT_ITEM_HEIGHT)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_VOLUME, FIELD_VALUES.DEFAULT_ITEM_VOLUME)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_WEIGHT_UNIT, FIELD_VALUES.DEFAULT_WEIGHT_UNIT)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_LENGTH_UNIT, FIELD_VALUES.DEFAULT_UNIT)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_WIDTH_UNIT, FIELD_VALUES.DEFAULT_UNIT)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_HEIGHT_UNIT, FIELD_VALUES.DEFAULT_UNIT)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_VOLUME_UNIT, FIELD_VALUES.DEFAULT_UNIT_VOLUME)
    const descriptionItem = `${FIELD_VALUES.DEFAULT_ITEM_DESCRIPTION}_${index}`;
    const instructionItem = `${FIELD_VALUES.DEFAULT_ITEM_SPECIAL_INSTRUCTIONS}_${index}`;
    const externalCustomerItemOneId = `${FIELD_VALUES.DEFAULT_ITEM_EXTERNAL_CUSTOMER_ID_1}_${datetimeMoment.format('HHmmss')}_${index}`;
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_DESCRIPTION, descriptionItem)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_SPECIAL_INSTRUCTIONS, instructionItem)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_EXTERNAL_CUSTOMER_ID_1, externalCustomerItemOneId)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_EXTERNAL_CUSTOMER_ID_2, FIELD_VALUES.DEFAULT_ITEM_EXTERNAL_CUSTOMER_ID_2)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_EXTERNAL_CUSTOMER_ID_3, FIELD_VALUES.DEFAULT_ITEM_EXTERNAL_CUSTOMER_ID_3)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _ITEM_DETAILS_STRING, FIELD.ITEM_COD_PRICE, FIELD_VALUES.DEFAULT_ITEM_COD_PRICE)
    // Update container details
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _CONTAINER_DETAILS_STRING, FIELD.CONTAINER, FIELD_VALUES.DEFAULT_ITEM_CONTAINER)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _CONTAINER_DETAILS_STRING, FIELD.CONTAINER_ISO_TYPE, FIELD_VALUES.DEFAULT_ITEM_CONTAINER_ISO_TYPE[Math.floor(Math.random() * FIELD_VALUES.DEFAULT_ITEM_CONTAINER_ISO_TYPE.length)])
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _CONTAINER_DETAILS_STRING, FIELD.CONTAINER_DESCRIPTION, FIELD_VALUES.DEFAULT_ITEM_CONTAINER_DESCRIPTION)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _CONTAINER_DETAILS_STRING, FIELD.CONTAINER_SEAL, FIELD_VALUES.DEFAULT_ITEM_CONTAINER_SEAL)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _CONTAINER_DETAILS_STRING, FIELD.CONTAINER_SLOT_REFERENCE, FIELD_VALUES.DEFAULT_ITEM_CONTAINER_SLOT_REFERENCE)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _CONTAINER_DETAILS_STRING, FIELD.CONTAINER_SLOT_DATE, FIELD_VALUES.DEFAULT_ITEM_CONTAINER_SLOT_DATE)
    updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, _EMPTY_STRING, _CONTAINER_DETAILS_STRING, FIELD.CONTAINER_TARE_WEIGHT, FIELD_VALUES.DEFAULT_ITEM_CONTAINER_TARE_WEIGHT)
    // Update task details list
    for (const leg of ALL_LEGS) {
      for (const TASK_DETAILS of ALL_TASK_DETAILS_IN_LEG) {

        const taskType = FIELD_VALUES.DEFAULT_TASK_TYPES[ALL_TASK_DETAILS_IN_LEG.indexOf(TASK_DETAILS)]
        let addressToUpdate = null;
        if (taskType.toLowerCase() === 'pickup') {
          addressToUpdate = GEN_MODE.TOGGLE_USE_ONLY_ONE_PICKUP ? FIELD_VALUES.DEFAULT_PICKUP : addresses_book_list[Math.floor(Math.random() * (addresses_book_list.length - 1))]
        }
        else if (taskType.toLowerCase() === 'dropoff') {
          addressToUpdate = GEN_MODE.TOGGLE_USE_ONLY_ONE_DROPOFF ? FIELD_VALUES.DEFAULT_DROPOFF : addresses_book_list[Math.floor(Math.random() * (addresses_book_list.length - 1))]
        } else {
          addressToUpdate = addresses_book_list[Math.floor(Math.random() * (addresses_book_list.length - 1))]
        }

        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_TYPE, taskType)
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_ADDRESS_1, addressToUpdate['Address 1'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_ADDRESS_2, addressToUpdate['Address 2'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_COUNTRY, addressToUpdate['Country'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_POSTAL_CODE, addressToUpdate['Postal Code'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_STATE, addressToUpdate['State'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_CITY, addressToUpdate['City'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_TIMEZONE, FIELD_VALUES.DEFAULT_TIMEZONE)
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_CONTACT_NAME, addressToUpdate['Contact Name'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_CONTACT_PHONE, addressToUpdate['Contact Phone'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_CONTACT_EMAIL, addressToUpdate['Contact Email'])
        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_CONTACT_COMPANY, addressToUpdate['Contact Company'])


        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_FROM_TIME, datetimeMoment.format(_DATETIME_FORMAT))

        datetimeMoment = datetimeMoment.add(FIELD_VALUES.DEFAULT_TIME_BETWEEN_FROM_AND_TO_TIME_IN_MINUTES, 'minutes')

        updateNewField(details, LEGS_ROW, SECTION_ROW, FIELDS_ROW, leg, TASK_DETAILS, FIELD.TASK_TO_TIME, datetimeMoment.format(_DATETIME_FORMAT))

        datetimeMoment = datetimeMoment.add(FIELD_VALUES.DEFAULT_TIME_BETWEEN_TASKS_IN_MINUTES, 'minutes')
      }
    }
    datetimeMoment = datetimeMoment.add(FIELD_VALUES.DEFAULT_TIME_BETWEEN_ITEMS_IN_MINUTES, 'minutes')

    // With index 0, replace the first data with the first generated details row
    index === 0 ? csvTemplateData.splice(3, 1, details) : csvTemplateData.push(details)
    index++;

  } while (index < _NO_ITEMS_WILL_BE_GENERATED)

  // Write data to csv file
  const OUTPUT_DIR = 'output'
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const csv_gen_file = `${OUTPUT_DIR}/gen_template_${_NO_ITEMS_WILL_BE_GENERATED}_items_${datetimeMoment.format('YYYY_MMM_DD_HHmmss')}.csv`

  await writeCSV(csvTemplateData, csv_gen_file)
  console.log('------------------------------------------')
  console.log('Generated %s item(s) Successful', _NO_ITEMS_WILL_BE_GENERATED)
  console.log('Open generated file       : % open', csv_gen_file)
  console.log('to generate multiple items: % node generateBatchOrderFileNewBooking.js --noItems=5')
  console.log('to generate multiple items with specific config file: $ node generateBatchOrderFileNewBooking.js --noItems=5 --config=config.js')
  console.log('------------------------------------------')
}

function updateNewField(row_data, templateRow1, templateRow2, templateRow3, legName, sectionName, fieldNameList, newValue) {
  let found = false;
  const legIndex = legName === _EMPTY_STRING ? 0 : templateRow1.indexOf(legName)
  const sectionIndex = templateRow2.indexOf(sectionName, legIndex)

  for (const fieldName of fieldNameList) {
    const field_index = templateRow3.indexOf(fieldName, sectionIndex)

    if (field_index !== -1) {
      row_data[field_index] = newValue;
      found = true;
      break;
    }
  }
  /**
   * Console Debug log
   **/
  // if (found === false) {
  //   console.warn(`- Warning: "${legName}" - "${sectionName}" - "${fieldNameList[0]}" does not exist. It will be not updated`)
  // } else {
  //   console.log(fieldNameList)
  // }
}

// Function to read csv which returns a promise so you can do async / await.
const readCSV = async (filePath, hasHeader = true) => {
  // read csv file and convert to string
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise(resolve => {
    papaparse.parse(csvData, {
      header: hasHeader,
      // transformHeader: header => header.trim(),
      complete: results => {
        // console.log(results.data);
        resolve(results.data);
      }
    });
  });
};

// Function to write csv
const writeCSV = async (data, filePath) => {
  const ws = fs.createWriteStream(filePath);
  fastcsv
    .write(data, { headers: false })
    .pipe(ws);
}

generateBatchUploadFileNewBooking()