/// <reference types="cypress" />

it('click all links with loop', () => {

    const pages = ['blog', 'about', 'contact']

    cy.visit('/')

    pages.forEach(page => {

        cy.contains(page).click()
        cy.location('pathname').should('eq', `/${page}`)
        cy.go('back')

    })
})

it('use requests to navigation bar links', () => {

    const pages = ['blog', 'about', 'contact']

    cy.visit('/')

    pages.forEach(page => {

        cy
            .contains(page)
            .then((link) => {
                cy.request(link.prop('href'))
            })

    })

});


it('check all links on page', () => {

    cy.visit('/')
    cy.get('a').each(page => {
        cy.request(page.prop('href'))
    })

});


it('check all links on page', () => {

    cy.visit('/')
    cy.get('a').each(page => {
        cy.request(page.prop('href'))
    })

});
