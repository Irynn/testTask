describe('https://jsonplaceholder.typicode.com/ set of sample tests', () => {
    /**
     * @typedef {Object} Todo
     * @property {number} id
     * @property {string} task
     */

    const getPosts = () => {
        cy.request('/posts')
            .its('body')
    };

    const getSpecificPost = (index) => {
        cy.request('/posts/'+index)
            .its('body')
    };

    it('GET /posts and parse response', ()=> {
        cy.request('/posts')
            .its('body')
            .each(value => {
                expect(value).to.have.all.keys('userId', 'id', 'title', 'body')
            })
    });

    it('GET specific post should return post with postId',  () => {
        cy.request('/posts/3')
            .then((response) => {
                expect(response.body).to.have.property('id', 3)
            })
    });

    it('GET comments for specific post', () => {
        cy.request('posts/4/comments')
            .then((response) => {
                response.body.forEach((item) => {
                    expect(item).to.have.property('postId', 4)
                })
            })
    })
});