// installation - packages requires
// $ npm i --save-dev papaparse fast-csv request-promise request command-line-args
/********************************
 * How to run with command prompt
 * Step 1. download template.csv file and place the same folder with this file
 * Step 2. $ node csvGenerateSingaporeBatchOrder.js --noItemsGen 10
 ********************************/

/**
 * Work Flow
 * 1 - Read all address lines from address file template (csv)
 * 2 - Update Pickup Details (get random an address from the above list)
 * 3 - Update Dropoff Details (get random an address from the above list, diff from pickup address)
 * 4 - Update Item Details
 * 5 - Update Extra
 * 6 - Create Item from Pickup, Dropoff, Item , Extra Details
 * 7 - Save Item to file
 */
const fs = require('fs');
const papaparse = require('papaparse');
const fastcsv = require('fast-csv');
const commandLineArgs = require('command-line-args');

const _csv_address_file = 'singapore_addresses_template.csv'
const _csv_order_template_file = 'template.csv'
const _optionDefinitions = [{ name: 'noItemsGen', alias: 'n', type: Number }]
const _no_items_will_be_generated = (!commandLineArgs(_optionDefinitions)['noItemsGen']) ? 1 : commandLineArgs(_optionDefinitions)['noItemsGen']

// Parent Header
const HEADER_PICKUP_DETAILS_STR = 'Pickup Details'
const HEADER_DROPOFF_DETAILS_STR = 'Dropoff Details'
const HEADER_ITEM_DETAILS_STR = 'Item Details'
const HEADER_EXTRA_STR = 'Extra'
const PAYLOAD_TYPES = ['Package', 'Document']
// time start from 0h
var dateNow = new Date()
dateNow.setHours(0, 0, 0);
// var dateNow = new Date().toLocaleString('en-US', { timeZone: 'Singapore' });

const generateOrderTemplate = async () => {
  // Step 1 - Read all address lines from address file template (csv)
  const address_book_list = await readCSV(_csv_address_file)
  // console.log(address_book_list)
  let parsedData = await readCSV(_csv_order_template_file, false);
  const parent_header_row = parsedData[0]
  const header_row = parsedData[1]
  const thirdRowData = parsedData[2]
  parsedData.pop()
  /** Iterate to create each item and push to array
   * Step 2 - Update Pickup Details (get random an address from the above list)
   * Step 3 - Update Dropoff Details (get random an address from the above list, diff from pickup address)
   * Step 4 - Update Item Details
   * Step 5 - Update Extra
   * Step 6 - Create Item from Pickup, Dropoff, Item , Extra Details
   * Step 7 - Save Item to file
   */
  let index = 0;
  do {

    // copy third row from template file
    let row = [...thirdRowData];

    // Update pickup data
    if (parent_header_row.includes(HEADER_PICKUP_DETAILS_STR)) {
      // random pick an address from list of the booking addresses
      randomOneAddressBook = address_book_list[Math.floor(Math.random() * (address_book_list.length - 1))]

      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Address Line 1 *', randomOneAddressBook['Address 1'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Address Line 2', randomOneAddressBook['Address 2'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Country', randomOneAddressBook['Country'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Zipcode', randomOneAddressBook['Postal Code'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Contact Name', randomOneAddressBook['Contact Name'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Contact Phone', randomOneAddressBook['Contact Phone'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Contact Email', randomOneAddressBook['Contact Email'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'Contact Company', randomOneAddressBook['Contact Company'])
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'From *', dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false))
      dateNow.setMinutes(dateNow.getMinutes() + 5)
      updateField(row, parent_header_row, HEADER_PICKUP_DETAILS_STR, header_row, 'To *', dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false))
      dateNow.setMinutes(dateNow.getMinutes() + 1)
    }

    // Update dropoff data
    if (parent_header_row.includes(HEADER_DROPOFF_DETAILS_STR)) {
      // random dropoff an address from list of the booking addresses
      randomOneAddressBook = address_book_list[Math.floor(Math.random() * (address_book_list.length - 1))]

      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Address Line 1 *', randomOneAddressBook['Address 1'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Address Line 2', randomOneAddressBook['Address 2'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Country', randomOneAddressBook['Country'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Zipcode', randomOneAddressBook['Postal Code'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Contact Name', randomOneAddressBook['Contact Name'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Contact Phone', randomOneAddressBook['Contact Phone'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Contact Email', randomOneAddressBook['Contact Email'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'Contact Company', randomOneAddressBook['Contact Company'])
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'From *', dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false))
      dateNow.setMinutes(dateNow.getMinutes() + 5)
      updateField(row, parent_header_row, HEADER_DROPOFF_DETAILS_STR, header_row, 'To *', dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false))
      dateNow.setMinutes(dateNow.getMinutes() + 1)
    }

    if (parent_header_row.includes(HEADER_ITEM_DETAILS_STR)) {
      updateField(row, parent_header_row, HEADER_ITEM_DETAILS_STR, header_row, 'Payload Type', PAYLOAD_TYPES[Math.floor(Math.random() * PAYLOAD_TYPES.length)])
    }

    if (parent_header_row.includes(HEADER_EXTRA_STR)) {
      const ex_id_string = 'YOJ-' + '-' + index + dateFormat(dateNow, "%d%m%Y_%H%M%S", false)
      updateField(row, parent_header_row, HEADER_EXTRA_STR, header_row, 'External Item ID 1', ex_id_string)
    }

    if (index === 0) {
      parsedData.splice(2, 1, row);
    } else {
      parsedData.push(row)
    }

    index += 1;
  } while (index < _no_items_will_be_generated);


  // console.log(papaparse)
  // Write data to csv file
  const csv_gen_file = 'gen_template_' + dateFormat(dateNow, "%d%m%Y_%H%M%S", false) + '.csv'

  await writeCSV(parsedData, csv_gen_file)
  console.log('------------------------------------------')
  console.log('Generated %s item(s) Successful', _no_items_will_be_generated)
  console.log('to open generated file using command: $ open', csv_gen_file)
  console.log('to generate more than one item using: $ node csvGenerateSingaporeBatchOrder.js --noItemsGen=5')
  console.log('------------------------------------------')
}

function updateField(row_data, parent_header, parent_header_name, header, header_name, value) {
  const parent_header_index = parent_header.indexOf(parent_header_name)
  const header_index = header.indexOf(header_name, parent_header_index)
  row_data[header_index] = value
  return row_data;
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

function dateFormat(date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace(/%[YmdHMS]/g, function (m) {
    switch (m) {
      case '%Y': return date[utc + 'FullYear'](); // no leading zeros required
      case '%m': m = 1 + date[utc + 'Month'](); break;
      case '%d': m = date[utc + 'Date'](); break;
      case '%H': m = date[utc + 'Hours'](); break;
      case '%M': m = date[utc + 'Minutes'](); break;
      case '%S': m = date[utc + 'Seconds'](); break;
      default: return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice(-2);
  });
}

generateOrderTemplate()