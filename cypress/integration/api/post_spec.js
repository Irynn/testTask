describe('POSTing different stuff:', () => {
    it('POST album', () => {
        const album = {
            userId: 1,
            id: 333,
            title: "tttzzz"
        };
        cy.request('POST', '/albums', album)
            .its('status').should('equal', 201)
    })
});