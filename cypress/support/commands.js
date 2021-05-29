// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- login with email and password --
Cypress.Commands.add('login', (email, password) => {

  cy
    .request({
      method: 'POST',
      url: Cypress.env('base_url') + "api/v3/auth/signin",
      headers: {
        "company_slug": Cypress.env('company_slug'),
        "accept": "application/json",
        "content-type": "application/json;charset=UTF-8",
      },
      body: { email: `${email}`, password: `${password}` },
      failOnStatusCode: false
    })
})

// -- login with valid email and password--
Cypress.Commands.add('dispatcherLogin', () => {

  cy
    .login(Cypress.env('email'), Cypress.env('password'))
    // .as('dispatcherLoginRes')
})


Cypress.Commands.add('createOrders', () => {

  cy
    .request({
      method: 'POST',
      url: Cypress.env('base_url') + "api/v3/sender/orders_multi_leg",
      headers: {
        "company_slug": Cypress.env('company_slug'),
        "accept": "application/json",
        "content-type": "application/json;charset=UTF-8",
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdHlwZSI6Im1haW4iLCJwZXJtaXNzaW9uc191cGRhdGVkX2F0IjpudWxsLCJhdWQiOiJKb2tlbiIsImNvbXBhbnlfaWQiOjEsImNvbXBhbnlfc2x1ZyI6InlvamVlIiwiZXhwIjoxNjIyMDUzMDkxLCJpYXQiOjE2MjIwNTIxOTEsImlzcyI6Ikpva2VuIiwianRpIjoiMnExYXZudTNnbnUyYmVsYWIwMDBnOGZpIiwibmJmIjoxNjIyMDUyMTkxLCJ1c2VyX3Byb2ZpbGVfaWQiOjkzMjF9.h1fP5Y_Wapodcsq7wpKHjoRYJhU_eVOlchghYASHhYI",    
      },
      body: { email: `${email}`, password: `${password}` },
      failOnStatusCode: false
    })
})

// fetch("https://umbrella-staging.yojee.com/api/v3/sender/orders_multi_leg", {
//   "headers": {

//   },
//   "referrerPolicy": "same-origin",
//   "body": "{\"items\":[{\"description\":\"\",\"height\":null,\"length\":null,\"weight\":1,\"width\":null,\"volume\":null,\"quantity\":\"1\",\"volumetric_weight\":1,\"payload_type\":\"Carton\",\"service_type\":\"same_day\",\"external_customer_id\":\"\",\"external_customer_id2\":\"\",\"external_customer_id3\":\"\",\"info\":\"\"}],\"steps\":[{\"address\":\"58 Jln Sejarah, Singapore 299088\",\"address2\":\"\",\"contact_company\":\"\",\"contact_email\":\"\",\"contact_name\":\"sdf\",\"contact_phone\":\"+65123458\",\"country\":\"Singapore\",\"from_time\":\"2021-05-27T17:00:00.000Z\",\"lat\":1.3318534845245984,\"lng\":103.81815752070307,\"postal_code\":\"299088\",\"state\":\"\",\"to_time\":\"2021-05-27T18:00:00.000Z\"}],\"item_steps\":[{\"item_id\":0,\"order_step_id\":0,\"step_group\":1,\"step_sequence\":1,\"type\":\"dropoff\"}],\"placed_by_user_profile_id\":\"1\",\"container_no\":\"\",\"sender_type\":\"individual\",\"sender_id\":1877,\"price_amount\":0,\"price_currency\":\"SGD\",\"external_id\":\"\"}",
//   "method": "POST",
//   "mode": "cors"
// });