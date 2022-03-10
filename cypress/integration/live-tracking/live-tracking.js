/// <reference types="cypress"/>

describe("ETA", () => {
  it("Test Navigation Apps > Projects > My Projects", () => {
    cy.visit("https://yojee.track-staging.yojee.com/order/O-OUJTIZHWYG4G");

    cy.get('.eta-information-icon').trigger('mouseover')
    cy.get('[role="tooltip"]').should('be.visible')
    cy.get('[role="tooltip"]').should('have.text', 'This is a Live ETA, but please note that the ETA is an estimation')
  });

//     /**
//    * These fields below from fixture according to company slug, enviroment as dev, staging
//    * Password field from .env
//    */
//      cy.fixture('cypress.env.json').then((data) => {
//         fixtureCypressEnvJsonFileData = data;
//         setGlobalThis(env, slug);
//       }).then(() => {
//         cy.clearLocalStorage();
//         // lead information ignore
//         if (env === "staging") {
//           cy.log('lead information ignore on staging');
//           cy.setLocalStorage('li_ignored', '[{"id":2721091,"time":1639842959550},{"id":2734038,"time":1639843572960}]')
//           cy.saveLocalStorage()
//         }
//       })
});
