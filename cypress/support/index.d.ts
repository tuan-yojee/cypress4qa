
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * 
         * @param email 
         * @param password 
         */
        login(email: String, password: String): Chainable<any>

        /**
         * 
         */
        loginSuccessfully(): Chainable<any>
    }
}
