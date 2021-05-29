// before(() => {
//   cy.dispatcherLogin().its('body.data').as('loginData')
// })

describe('API Booking Page', () => {
  beforeEach(() => {
    cy.dispatcherLogin().its('body.data').as('loginData')
  })
  it('API Booking Page - Create an order', function() {
    console.log(this.loginData.access_token)

    // cy.createOrders()
  })
})
describe('API Booking Page', () => {
  beforeEach(() => {
    cy.dispatcherLogin().its('body.data').as('loginData')
  })
  it('API Booking Page - Create an order', function() {
    console.log(this.loginData.access_token)

    // cy.createOrders()
  })
})
// fetch("https://umbrella-staging.yojee.com/api/v3//public/jwt/auth_token", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/json;charset=UTF-8",
//     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site"
//   },
//   "referrerPolicy": "same-origin",
//   "body": "{\"refresh_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdHlwZSI6InJlZnJlc2hfdG9rZW4iLCJhdWQiOiJKb2tlbiIsImNvbXBhbnlfaWQiOjEsImNvbXBhbnlfc2x1ZyI6InlvamVlIiwiZXhwIjoxNjIyNjQ0MjUxLCJpYXQiOjE2MjIwMzk0NTEsImlzcyI6Ikpva2VuIiwianRpIjoiMnExYThpYmJjOHJ2aDg2c3JrMDBmOHYxIiwibmJmIjoxNjIyMDM5NDUxLCJ1c2VyX3Byb2ZpbGVfaWQiOjkzMjF9.pHMji2gcQeK0np-rU2Oda0ubOQU7bF62Mh8zZCjwBv8\"}",
//   "method": "POST",
//   "mode": "cors"
// });




// fetch("https://www.google-analytics.com/j/collect?v=1&_v=j90&a=425764749&t=event&ni=0&_s=1&dl=https%3A%2F%2Fyojee.book-staging.yojee.com%2Forder%2Fconfirmation&dp=%2Forder%2Fconfirmation&ul=en-us&de=UTF-8&dt=Order%20confirmation&sd=30-bit&sr=1440x900&vp=1440x387&je=0&ec=Delivery%20Booking&ea=Individual&_u=SACAAEABAAAAAC~&jid=749223342&gjid=966926520&cid=1051570667.1620874610&tid=UA-135682882-2&_gid=640717856.1621826076&_r=1&gtm=2wg5j05HXRPPP&z=1490768650", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "text/plain",
//     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrerPolicy": "same-origin",
//   "body": "",
//   "method": "POST",
//   "mode": "cors"
// });

