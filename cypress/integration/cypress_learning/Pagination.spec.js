describe('Sync and Async', () => {

    it.only('Recursion', () => {
        function test(index) {
            if (index >= 10) {
                return false;
            } else {
                console.log(index)
                test(++index)
            }
        }
        test(0)
    })

    it('Pagination', () => {
        cy.visit('https://examples.bootstrap-table.com/template.html?v=134&url=options%2Ftable-pagination.html')

        findItem('Item 2')
    });
});


// Steps
// Build mechanism to Iterate through Pages - Note - Page Elements are refreshed
// Build logic to Iterate through the table
// ce matching record is found
function findItem(value) {

}