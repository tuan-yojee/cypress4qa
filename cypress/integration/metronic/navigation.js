/// <reference types="cypress"/>

describe("Test Navigation", () => {
  it("Test Navigation Apps > Projects > My Projects", () => {
    cy.visit("https://preview.keenthemes.com/metronic8/demo1/index.html");

    // Click on the Menu Projects
    cy.get('.menu-title:contains("Projects")').eq(1).click()

    // Click on the Sub Menu - My Projects
    cy.get('.menu-title:contains("My Projects")').eq(1).click({force:true})

  });
});
