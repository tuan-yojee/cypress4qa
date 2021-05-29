describe('Board Management', () => {

    before(() => {

        cy
            .visit('/')
    })


    it('Creating a new board', () => {

        cy
            .addBoard('new board')
    })
})

