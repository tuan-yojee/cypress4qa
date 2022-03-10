/// <reference types="cypress"/>

describe("Task Command", () => {
  it.only("should send execute something on node", () => {
    cy.task("print", "This will be output to the terminal");
  });
});
