/*===============================================================================
 * DATA FOR UPDATING
 *==============================================================================*/
const GEN_MODE = {
    TOGGLE_USE_ONLY_ONE_PICKUP: false,
    TOGGLE_USE_ONLY_ONE_DROPOFF: true,
    TOGGLE_USE_ONLY_PACKAGE_TYPE_AS_CONTAINER: false
}

// You might want to update the data
const INPUT_FILES = {
    CSV_ADDRESSES_BOOK_TEMPLATE_FILE: 'data/philippines_addresses_template_kntesting.csv',
    CSV_TEMPLATE_FILE: 'template/template_kntesting_staging_p2p.csv',
}

// You might want to update the data
// with @random-with-prefix
const FIELD_VALUES = {
    DEFAULT_UNIT: 'meter',
    DEFAULT_UNIT_VOLUME: 'cubic_meter',
    DEFAULT_WEIGHT_UNIT: 'kilogram',
    DEFAULT_TIMEZONE: 'Singapore',
    DEFAULT_TASK_TYPES: ['pickup', 'dropoff'],
    DEFAULT_ORDER_EXTERNAL_ID: 'my-external-order-id',
    DEFAULT_ORDER_SERVICE_TYPES: ['Same day', 'Next day', 'Express'],
    DEFAULT_ORDER_PACKING_MODES: ['FTL', 'LTL'],
    DEFAULT_ITEM_PACKAGE_TYPES: ['Package', 'Document', 'Container'],
    DEFAULT_ITEM_QUANTITY: '1',
    DEFAULT_ITEM_WEIGHT: '10',
    DEFAULT_ITEM_LENGTH: '1.4',
    DEFAULT_ITEM_WIDTH: '0.6',
    DEFAULT_ITEM_HEIGHT: '0.4',
    DEFAULT_ITEM_VOLUME: '',
    DEFAULT_ITEM_DESCRIPTION: 'my-item-description',
    DEFAULT_ITEM_SPECIAL_INSTRUCTIONS: 'my-additional-info',
    DEFAULT_ITEM_EXTERNAL_CUSTOMER_ID_1: 'my-external-customer-id-1',
    DEFAULT_ITEM_EXTERNAL_CUSTOMER_ID_2: 'my-external-customer-id-2',
    DEFAULT_ITEM_EXTERNAL_CUSTOMER_ID_3: 'my-external-customer-id-3',
    DEFAULT_ITEM_COD_PRICE: '12',
    DEFAULT_ITEM_CONTAINER: 'my-item-container',
    DEFAULT_ITEM_CONTAINER_ISO_TYPE: ['12TR', 'L5RT', 'L5R0'],
    DEFAULT_ITEM_CONTAINER_DESCRIPTION: 'my-item-container-description',
    DEFAULT_ITEM_CONTAINER_SEAL: 'my-item-container-seal',
    DEFAULT_ITEM_CONTAINER_SLOT_REFERENCE: 'my-item-container-slot-reference',
    DEFAULT_ITEM_CONTAINER_SLOT_DATE: '27/05/2022 13:30',
    DEFAULT_ITEM_CONTAINER_TARE_WEIGHT: '300',
    DEFAULT_PICKUP: {
        'Address 1': '',
        'Address 2': '',
        'Country': '',
        'Postal Code': '',
        'City': '',
        'State': '',
        'Contact Name': '',
        'Contact Phone': '',
        'Contact Email': '',
        'Contact Company': ''
    },
    DEFAULT_DROPOFF: {
        'Address 1': 'Katurian Rd, corner Mabato, Taguig, Metro Manila, Philippines',
        'Address 2': 'Taguig City',
        'Country': 'Philippines',
        'Postal Code': '',
        'City': '',
        'State': '',
        'Contact Name': 'Lazada Tipas Cross-dock',
        'Contact Phone': '9178058015',
        'Contact Email': 'claas.durach@lazada.com.ph',
        'Contact Company': ''
    },
    DEFAULT_TIME_BETWEEN_FROM_AND_TO_TIME_IN_MINUTES: 60,
    DEFAULT_TIME_BETWEEN_TASKS_IN_MINUTES: -60,
    DEFAULT_TIME_BETWEEN_ITEMS_IN_MINUTES: 0
}

/**
 * Declare all custom fields here for all slugs
 * 
 * Getting these fields should be automated for next changes
 */
const FIELD = {
    ORDER_EXTERNAL_ID: ['External ID', 'External ID *'],
    ORDER_SERVICE_TYPE: ['Service Type', 'Service Type *'],
    ORDER_PACKING_MODE: ['Packing Mode', 'Packing Mode *'],
    ITEM_PACKAGE_TYPE: ['Package Type', 'Package Type *', 'Payload Type *'],
    ITEM_QUANTITY: ['Quantity', 'Quantity *'],
    ITEM_WEIGHT: ['Weight', 'Weight *'],
    ITEM_WEIGHT_UNIT: ['Weight Unit', 'Weight Unit *'],
    ITEM_LENGTH_UNIT: ['Length Unit', 'Length Unit *'],
    ITEM_LENGTH: ['Length', 'Length *'],
    ITEM_WIDTH: ['Width', 'Width *'],
    ITEM_WIDTH_UNIT: ['Width Unit', 'Width Unit *'],
    ITEM_HEIGHT: ['Height', 'Height *'],
    ITEM_HEIGHT_UNIT: ['Height Unit', 'Height Unit *'],
    ITEM_VOLUME: ['Volume', 'Volume *'],
    ITEM_VOLUME_UNIT: ['Volume Unit', 'Volume Unit *'],
    ITEM_DESCRIPTION: ['Description', 'Description *', 'description'],
    ITEM_SPECIAL_INSTRUCTIONS: ['Special Instructions', 'Special Instructions *', 'Additional Info'],
    ITEM_EXTERNAL_CUSTOMER_ID_1: ['External Customer Id 1', 'External Customer Id 1 *', 'External Item ID 1', 'External Item ID 1 *', 'External Customer Id'],
    ITEM_EXTERNAL_CUSTOMER_ID_2: ['External Customer Id 2', 'External Customer Id 2 *'],
    ITEM_EXTERNAL_CUSTOMER_ID_3: ['External Customer Id 3', 'External Customer Id 3 *'],
    ITEM_COD_PRICE: ['COD Price', 'COD Price *', 'Cash on delivery price', 'Cash on delivery price *'],
    CONTAINER: ['Container#', 'Container# *'],
    CONTAINER_ISO_TYPE: ['ISO Type', 'ISO Type *'],
    CONTAINER_DESCRIPTION: ['Description', 'Description *', 'Description container'],
    CONTAINER_SEAL: ['Seal#', 'Seal# *'],
    CONTAINER_SLOT_REFERENCE: ['Slot Reference', 'Slot Reference *'],
    CONTAINER_SLOT_DATE: ['Slot Date', 'Slot Date *'],
    CONTAINER_TARE_WEIGHT: ['Tare Weight', 'Tare Weight *'],
    TASK_TYPE: ['Task Type', 'Task Type *'],
    TASK_ADDRESS_1: ['Address Line 1', 'Address Line 1 *', 'Address *', 'Address  *'],
    TASK_ADDRESS_2: ['Address Line 2', 'Address Line 2 *'],
    TASK_COUNTRY: ['Country', 'Country *'],
    TASK_POSTAL_CODE: ['Postal Code', 'Postal Code *', 'Zipcode', 'Zipcode *'],
    TASK_STATE: ['State', 'State *'],
    TASK_CITY: ['City', 'City *'],
    TASK_TIMEZONE: ['Timezone', 'Timezone *'],
    TASK_CONTACT_NAME: ['Contact Name', 'Contact Name *'],
    TASK_CONTACT_PHONE: ['Contact Phone', 'Contact Phone *'],
    TASK_CONTACT_EMAIL: ['Contact Email', 'Contact Email *'],
    TASK_CONTACT_COMPANY: ['Contact Company', 'Contact Company *', 'Company Name'],
    TASK_FROM_TIME: ['From Time', 'From Time *', 'From *'],
    TASK_TO_TIME: ['To Time', 'To Time *', 'To *'],
}


module.exports = { GEN_MODE, INPUT_FILES, FIELD, FIELD_VALUES }