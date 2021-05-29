/// <reference types="cypress" />


// const addBoard = (input: 'new board' | 'my board') => {
//   cy
//     .get('[data-cy="create-board"]')
//     .click();

//   cy
//     .get('[data-cy=new-board-input]')
//     .type(`${input}{enter}`);
// }


/**
 * Creates a new board
 * @param titles
 */
const addTodo = (titles: string[]) => {

  titles.forEach(title => {

    cy
      .get('[data-cy="create-board"]')
      .click();

    cy
      .get('[data-cy=new-board-input]')
      .type(`${title}{enter}`);

  })
}


it('creating a board', () => {

  cy
    .visit('/')


  addBoard('my board')
})
