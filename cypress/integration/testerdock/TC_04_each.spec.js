/// <reference types="cypress"/>

describe("Example to demonstrate the use each in Cypress", () => {
  before(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  });

  beforeEach(() => {
    cy.fixture("testerdock/testdata").then(function (data) {
      this.testdata = data;
    });
  });

  it("Validate successful login", function () {
    cy.get("#txtUsername").clear().type(this.testdata.username);
    cy.get("#txtPassword").clear().type(this.testdata.password);
    cy.get("#btnLogin").click();
    cy.get("#welcome").contains(this.testdata.welcomeText);
  });

  it("Validate all the Quick Launch Texts", function () {
    cy.get(".quickLaunge").each(($el, index) => {
      expect($el).to.contain(this.testdata.quickLaunch[index]);
    });
  });

  it("Validate the Employee Distribution by Subunit Piechart Values and ", function () {
    var total = 0;
    cy.get('.pieLabel')
  });
});
