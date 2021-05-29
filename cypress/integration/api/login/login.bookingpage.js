/// <reference types="cypress" />

describe('API Booking Page', () => {


  it('API Booking Page - Login with valid data', () => {

    cy
      .login(Cypress.env('email'), Cypress.env('password'))
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.data).property('access_token')
        expect(response.body.data.jwt_tokens).to.have.property('access_token')
        expect(response.body.data.jwt_tokens).to.have.property('refresh_token')
      })
  })

  it('API Booking Page - Login with missing email', () => {

    cy
      .login("", Cypress.env('password'))
      .then(response => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq("Unauthorized access!")
      })
  })

  it('API Booking Page - Login with missing password', () => {

    cy
      .login(Cypress.env('email'), "")
      .then(response => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq("Unauthorized access!")
      })
  })


  it('API Booking Page - Login with missing email and password', () => {

    cy
      .login(Cypress.env('email'), "")
      .then(response => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq("Unauthorized access!")
      })
  })
})
