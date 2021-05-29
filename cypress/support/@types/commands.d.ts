declare namespace Cypress {
    interface Chainable {
        /**
         * creates a new board via API
         * @param name 
         */
        addBoardApi(name: string): Chainable<Element>

        /**
         * Adds new list via API
         * @param options 
         */
        addListApi(options: {
            title: string;
            boardIndex?: string;
        }): Chainable<Element>
    }
}