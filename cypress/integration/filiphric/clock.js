/// <reference types="cypress"/>

describe("Clock", () => {
  it("move timer", () => {
    const now = new Date();

    cy.visit("https://yojee.track-staging.yojee.com/order/O-OUJTIZHWYG4G");

    cy.clock(now);

    cy.tick(10000);

    cy.clock().invoke("restore");
  });

  it.only("cy.clock() - control time in the browser", () => {
    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit("https://example.cypress.io/commands/spies-stubs-clocks");
    cy.get("#clock-div").click().should("have.text", "1489449600");
  });

  it.only('cy.tick() - move time in the browser', () => {
    // https://on.cypress.io/tick
  
    // create the date in UTC so its always the same
    // no matter what local timezone the browser is running in
    const now = new Date(Date.UTC(2017, 2, 14)).getTime()
  
    cy.clock(now)
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
    cy.get('#tick-div').click()
     .should('have.text', '1489449600')
  
    cy.tick(10000) // 10 seconds passed
    cy.get('#tick-div').click()
     .should('have.text', '1489449610')
   })
});
