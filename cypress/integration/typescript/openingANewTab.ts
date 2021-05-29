it('Opening a new tab in Cypress', () => {

    cy
    .get('a')
    .invoke('removeAttr', 'target')
})