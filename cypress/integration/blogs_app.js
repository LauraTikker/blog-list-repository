const { number } = require("prop-types")

describe('Blogs app', function() {

    beforeEach(function()   {
        cy.visit('http://localhost:8000')
    })

    it('front page can be opened', function()   {
        cy.contains('Blogs')
    })

    it('login form can be opened', function()   {
        cy.contains('Log in')
    })

    it('user can log in', function()   {
        cy.contains('Log in').click()
        cy.get('#username').type('Elise')
        cy.get('#password').type('12341534543')
        cy.get('#login-button').click()
        cy.contains('Elise logged in')
    })
})
