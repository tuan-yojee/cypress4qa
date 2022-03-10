/// <reference types="cypress"/>

import promisify from "cypress-promise";

it("should run tests with async/await", async () => {
  const apple = await promisify(cy.wrap("apple"));
  const oranges = await promisify(cy.wrap("oranges"));

  expect(apple).to.equal("apple");
  expect(oranges).to.equal("oranges");
});
