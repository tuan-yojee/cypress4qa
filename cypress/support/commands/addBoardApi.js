Cypress.Commands.add('addBoardApi', (name) => {

    cy
        .request('POST', '/api/boards', { name })
        .then(({ body }) => {

            Cypress.env('boards').push(body)

        })

})



Cypress.Commands.add('addListApi', ({ title, boardIndex = 0 }) => {

    cy
        .request('POST', '/api/lists', {
            boardId: Cypress.env('boards')[boardIndex].id,
            title,
        }).then(({ body }) => {
            Cypress.env('lists').push(body);
        });

});
