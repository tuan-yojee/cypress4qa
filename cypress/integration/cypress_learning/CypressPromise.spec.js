/// <reference types="cypress"/>

function delay(ms) {
  console.log("delay start");
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log("delay stop");
      resolve(42);
    }, ms);
  });
}

it("delays by 2 seconds", function () {
  cy.visit("/")
    .then(function () {
      //   delay(2000);
      //   cy.wrap(delay(2000));

      return delay(2000);
    })
    // the resolved value of the promise is passed
    // to the assertion here
    .should("eq", 42);
});

it("waits for promises to resolve", () => {
  let waited = false;

  function waitOneSecond() {
    // return a promise that resolves after 1 second
    return new Cypress.Promise((resolve, reject) => {
      setTimeout(() => {
        // set waited to true
        waited = true;

        // resolve with 'foo' string
        resolve("foo");
      }, 1000);
    });
  }

  cy.wrap(null).then(() => {
    // return a promise to cy.then() that is awaited until it resolves
    return waitOneSecond().then((str) => {
      expect(str).to.eq("foo");
      expect(waited).to.be.true;
    });
  });
});
