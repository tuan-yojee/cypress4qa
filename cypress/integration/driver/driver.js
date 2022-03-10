/// <reference types="cypress"/>

describe("Driver Management", () => {
  function getIframeBody() {
    return cy.get('iframe[title="manage-iframe"]').its("0.contentDocument.body").should("not.be.empty").then(cy.wrap);
  }

  before(() => {
    cy.visit("https://qacypressone.dispatcher-dev.yojee.com/login");
    cy.get("[data-cy='email']").type("tuan+qacypressone+dispatcher@yojee.com");
    cy.get("[data-cy='password']").type("P@ssw0rd1");
    cy.get("button[data-cy='submit']").click();
    cy.wait(5000)
    // Go to Manage page
    cy.get(`[data-cy="smi-manage"]`).click();
    getIframeBody().find('[data-cy="menu-item-parent-drivers"]').click();
    getIframeBody().find('[data-cy="menu-item-driver-management"]').click();
  });

  it.only("Driver Manage - Add Driver Popup", () => {
    getIframeBody().find('[data-cy="add-driver"]').click();
    getIframeBody().find('[data-cy="driver-type-of-transportation"]').contains('Select...').click();
    getIframeBody().contains('Xe Om').parent().parent().parent().parent()
    getIframeBody().contains('Xe Om').parents()
  });

  it("Driver Manage", () => {
    getIframeBody().find('[data-cy="table-body"] [data-cy="worker-checkbox"] input').eq(0).click({force: true});
    getIframeBody().find('[data-cy="all-drivers-bulk-edit"]').click();
    getIframeBody().contains('Transportation Type*').click()
    getIframeBody().contains('Next').click()
    getIframeBody().contains('Select...').click()
    getIframeBody().contains('Car').parent().parent().parent()
    getIframeBody().contains('Car').parents()
  });
});
