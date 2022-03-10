// packages requires
// npm i -s papaparse
// npm i -s fast-csv
// npm i -s request-promise
/********************************
 * How to run with command prompt
 * 1. download template.csv file from dispatcher and update the csvTemplateFilePath
 * 2. $ npm i -s papaparse fast-csv request-promise fs request
 * 3. $ node genCSV_KN.js
 ********************************/

const fs = require('fs');
const Papa = require('papaparse');
const fastcsv = require('fast-csv');
const request = require("request-promise");

const numberOfOrders = 50
const numberAddressBooking = 500
const csvTemplateFilePath = 'template.csv'
const csvNewFilePath = 'gen_testingkn_template.csv'
const COMPANY_SLUG = 'testingkn'
const BACKEND_URL = 'https://umbrella.yojee.com'

const createOrderTemplate = async () => {
  let parsedData = await readCSV(csvTemplateFilePath);
  let addressBookingItems = await getDispatcherAddressItemsFromAddressBooking(numberAddressBooking)
  let addressBookingItemsLength = addressBookingItems.length

  // Handle is single leg template with one Pickup and one Dropoff
  const firstRowData = parsedData[0]
  const secondRowData = parsedData[1]
  const thirdRowData = parsedData[2]

  if (firstRowData.includes('Pickup Details') && firstRowData.includes('Dropoff Details')) {
    // find pickupDetailsIndex, dropoffDetailsIndex
    const pickupDetailsIndex = firstRowData.indexOf('Pickup Details')
    const dropoffDetailsIndex = firstRowData.indexOf('Dropoff Details')
    const extraIndex = firstRowData.indexOf('Extra')

    // find indexes, start from index of pickupDetailsIndex
    const address1PickupIndex = secondRowData.indexOf('Address Line 1 *', pickupDetailsIndex)
    const address2PickupIndex = secondRowData.indexOf('Address Line 2', pickupDetailsIndex)
    const countryPickupIndex = secondRowData.indexOf('Country', pickupDetailsIndex)
    const zipcodePickupIndex = secondRowData.indexOf('Zipcode', pickupDetailsIndex)
    const contactNamePickupIndex = secondRowData.indexOf('Contact Name', pickupDetailsIndex)
    const contactPhonePickupIndex = secondRowData.indexOf('Contact Phone', pickupDetailsIndex)
    const contactEmailPickupIndex = secondRowData.indexOf('Contact Email', pickupDetailsIndex)
    const timeFromPickupIndex = secondRowData.indexOf('From *', pickupDetailsIndex)
    const timeToPickupIndex = secondRowData.indexOf('To *', pickupDetailsIndex)

    // find indexes, start from index of dropoffDetailsIndex
    const address1DropoffIndex = secondRowData.indexOf('Address Line 1 *', dropoffDetailsIndex)
    const address2DropoffIndex = secondRowData.indexOf('Address Line 2', dropoffDetailsIndex)
    const countryDropoffIndex = secondRowData.indexOf('Country', dropoffDetailsIndex)
    const zipcodeDropoffIndex = secondRowData.indexOf('Zipcode', dropoffDetailsIndex)
    const contactNameDropoffIndex = secondRowData.indexOf('Contact Name', dropoffDetailsIndex)
    const contactPhoneDropoffIndex = secondRowData.indexOf('Contact Phone', dropoffDetailsIndex)
    const contactEmailDropoffIndex = secondRowData.indexOf('Contact Email', dropoffDetailsIndex)
    const timeFromDropoffIndex = secondRowData.indexOf('From *', dropoffDetailsIndex)
    const timeToDropoffIndex = secondRowData.indexOf('To *', dropoffDetailsIndex)
    // find external id index
    // const externalCustomerIdIndex = secondRowData.indexOf('External Item ID 1 *', extraIndex)
    const externalCustomerIdIndex = secondRowData.indexOf('External Item ID 1', extraIndex)

    // var dateNow = new Date(new Date().setHours(0,0,0,0)); // last midnight
    var dateNow = new Date(); 
    dateNow.setHours(0,0,0);

    for (let index = 0; index < numberOfOrders; index++) {

      let cloneThirdRowData = [...thirdRowData];

      randomNumber = await getRandomInt(addressBookingItemsLength - 1)
      randomAddressBookingItem = await addressBookingItems[randomNumber]

      // var pickupData = await getPickupData()
      var dropoffData = await getDropoffData()

      // update current row with pickup data
      cloneThirdRowData[address1PickupIndex] = randomAddressBookingItem.address1
      cloneThirdRowData[address2PickupIndex] = randomAddressBookingItem.address2
      cloneThirdRowData[countryPickupIndex] = randomAddressBookingItem.country
      cloneThirdRowData[zipcodePickupIndex] = randomAddressBookingItem.postal_code
      cloneThirdRowData[contactNamePickupIndex] = randomAddressBookingItem.contact_name
      cloneThirdRowData[contactPhonePickupIndex] = randomAddressBookingItem.contact_phone
      cloneThirdRowData[contactEmailPickupIndex] = randomAddressBookingItem.contact_email
      // update current row with pickup data
      // cloneThirdRowData[address1PickupIndex] = pickupData.addressNumberOne
      // cloneThirdRowData[address2PickupIndex] = pickupData.addressNumberTwo
      // cloneThirdRowData[countryPickupIndex] = pickupData.country
      // cloneThirdRowData[zipcodePickupIndex] = pickupData.postalCode
      // cloneThirdRowData[contactNamePickupIndex] = pickupData.contactName
      // cloneThirdRowData[contactPhonePickupIndex] = pickupData.contactPhone
      // cloneThirdRowData[contactEmailPickupIndex] = pickupData.contactEmail

      cloneThirdRowData[timeFromPickupIndex] = dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false)
      dateNow.setMinutes(dateNow.getMinutes() + 30)

      cloneThirdRowData[timeToPickupIndex] = dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false)
      dateNow.setMinutes(dateNow.getMinutes() + 30)

      // update current row with dropoff data
      cloneThirdRowData[address1DropoffIndex] = dropoffData.addressNumberOne
      cloneThirdRowData[address2DropoffIndex] = dropoffData.addressNumberTwo
      cloneThirdRowData[countryDropoffIndex] = dropoffData.country
      cloneThirdRowData[zipcodeDropoffIndex] = dropoffData.postalCode
      cloneThirdRowData[contactNameDropoffIndex] = dropoffData.contactName
      cloneThirdRowData[contactPhoneDropoffIndex] = dropoffData.contactPhone
      cloneThirdRowData[contactEmailDropoffIndex] = dropoffData.contactEmail

      cloneThirdRowData[timeFromDropoffIndex] = dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false)
      dateNow.setMinutes(dateNow.getMinutes() + 30)
      cloneThirdRowData[timeToDropoffIndex] = dateFormat(dateNow, "%d/%m/%Y %H:%M:%S", false)
      dateNow.setMinutes(dateNow.getMinutes() + 30)

      // update External customer id - ex YOJ-1-1621398569575
      cloneThirdRowData[externalCustomerIdIndex] = 'YOJ-' + index + '-' + Date.now()

      if (index === 0) {
        // Adding Elements Anywhere in an Array
        // start - The index at which to begin modifying the array.
        parsedData.splice(2, 1, cloneThirdRowData);
      } else {
        parsedData.push(cloneThirdRowData)
      }
    }

    // Write data to csv file
    await writeCSV(parsedData, csvNewFilePath)
    console.log('Complete generating with %s orders', numberOfOrders)

  } else {
    console.warn('Does Not Handle For Multiple Legs Yet!')
  }
}

// Function to read csv which returns a promise so you can do async / await.
const readCSV = async (filePath) => {
  // read csv file and convert to string
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: false,
      // transformHeader: header => header.trim(),
      complete: results => {
        // console.log('Complete', results.data.length, 'records.');
        resolve(results.data);
      }
    });
  });
};

const writeCSV = async (data, filePath) => {
  const ws = fs.createWriteStream(filePath);
  fastcsv
    .write(data, { headers: false })
    .pipe(ws);
}

const getPickupData = async () => {
  var dropoffData = {
    addressNumberOne: '9 WILLIAM ST., COR SHERIDAN ST. BRGY HIGHWAY HILLS, MANDALUYONG CITY',
    addressNumberTwo: 'Metro Manila~Mandaluyong',
    country: 'Philippines',
    postalCode: null,
    contactName: 'momo',
    contactPhone: '639218894869',
    contactEmail: '',
  }
  return dropoffData
}

const getDropoffData = async () => {
  var dropoffData = {
    addressNumberOne: 'Katurian St. corner Mabatu St. Ibayo Tipas Taguig City (beside GMC ready Mix Corporation',
    addressNumberTwo: 'Metro Manila~Quezon City',
    country: 'Philippines',
    postalCode: '1630',
    contactName: 'Lazada Tipas Cross-dock',
    contactPhone: '',
    contactEmail: '',
  }
  return dropoffData
}

const getDispatcherAddressItemsFromAddressBooking = async (numberOfItems) => {
  // call from apis
  // 1. SignIn
  // 2. Get Addresses

  var headers = {
    'company_slug': 'testingkn',
    'content-type': 'application/json;charset=UTF-8',
  };

  var dataString = '{"email":"geetha+kntestlive@yojee.com","password":"12345678"}';

  var options = {
    url: `${BACKEND_URL}/api/v3/auth/signin`,
    method: 'POST',
    headers: headers,
    body: dataString
  };

  let jwt_tokens_access_token = null;

  function login(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      jwt_tokens_access_token = info.data.jwt_tokens.access_token
    }
  }

  await request(options, login);


  // Request 2: Get Address Booking
  var headers = {
    'authorization': 'Bearer ' + jwt_tokens_access_token,
    'company_slug': 'testingkn',
    'content-type': 'application/json;charset=UTF-8',
  };


  var options = {
    url: `${BACKEND_URL}/api/v3/dispatcher/address_items?page=1&page_size=` + numberOfItems + '&sort_by=external_id',
    headers: headers
  };
  
  var newAddressBookingData;

  function getAddressBooking(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);

      addressBookingData = info.data;

      newAddressBookingData = addressBookingData.filter((item) => {
        // console.log(item.contact_phone)
        // return (item.contact_phone !== null && item.country !== 'Viet Nam' && item.contact_name !== 'Getha')? item.contact_phone.length === 10 : false;
        return (item.contact_phone !== null && item.country !== 'Viet Nam')? item.contact_phone.length === 10 : false;
      })
    }
  }

  await request(options, getAddressBooking);

  return newAddressBookingData;
}

async function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function dateFormat (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}

createOrderTemplate()
