// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:8080')

    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(password)
        .should('have.attr', 'type', 'password') //proverila sam da li je pass obscured

    cy.get('.btn')
        .click()
})

Cypress.Commands.add('addBuilding', (mesto, ulica, broj, brojStanova) => {
    cy.get('#mesto')
        .clear()
        .type(mesto)

    cy.get('#ulica')
        .clear()
        .type(ulica)

    cy.get('#broj')
        .clear()
        .type(broj)

    cy.get('#brojStanova')
        .clear()
        .type(brojStanova)

    cy.get('.col-lg-9 > .btn-primary')
        .click()
})

Cypress.Commands.add('addStanara', (email, lozinka, ime, prezime) => {
    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(lozinka)

    cy.get('#ime')
        .clear()
        .type(ime)

    cy.get('#prezime')
        .clear()
        .type(prezime)

    cy.get('.col-lg-9 > .btn-primary')
        .click()
})
Cypress.Commands.add('changePass', (staralozinka, novaLozinka, potvrdaNoveLozinke) => {

    cy.get('#staraLozinka')
        .clear()
        .type(staralozinka)
        .should('have.attr', 'type', 'password')

    cy.get('#novaLozinka')
        .clear()
        .type(novaLozinka)
        .should('have.attr', 'type', 'password')

    cy.get('#potvrdaNoveLozinke')
        .clear()
        .type(potvrdaNoveLozinke)
        .should('have.attr', 'type', 'password')

    // cy.get('.center > .btn')        // dugme smo zakomentarisali ovde da bi mogli da proveravamo da li je disabled ili ne u testovima
    // .click()
})


Cypress.Commands.add('addInstitution', (email, lozinka, naziv, mesto, ulica, broj, brojTelefona) => {
    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(lozinka)

    cy.get('#naziv')
        .clear()
        .type(naziv)

    cy.get('#mesto')
        .clear()
        .type(mesto)

    cy.get('#ulica')
        .clear()
        .type(ulica)

    cy.get('#broj')
        .clear()
        .type(broj)

    cy.get('#brojTelefona')
        .clear()
        .type(brojTelefona)

    // cy.get('.col-lg-9 > .btn-primary')           //zakomentarisano zbog negativnih testova
    //     .click()
})