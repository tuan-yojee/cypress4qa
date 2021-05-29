/// <reference types='cypress'/>

it('creates a list', () => {

  cy
    .addBoardApi('first board')
    .addBoardApi('second board')
    .addListApi({ title: 'todo', boardIndex: 1 })

});

