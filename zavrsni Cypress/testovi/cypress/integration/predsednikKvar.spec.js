describe('Testiranje skupstine', () => {

    beforeEach(() => {
        cy.login('predSkup@gmail.com', 'Bar5slova');
        cy.get(':nth-child(4) > a').click()
    })

    it('Testiramo dodavanje skupstine', () => {

        cy.get(':nth-child(4) > .nav-link').click()     //odlazak na kvarove

        cy.get('.checkbox > label').click()     //trazimo prikaz i popravljenih

        cy.get('#dodaj > .btn').click()     //dodajemo novi kvar

        cy.get('#mesto')
            .clear()
            .type('hodnik')

        cy.get('#opis')
            .clear()
            .type('ograda je pukla')

        cy.get('#odgovorno_lice').click()       //biramo odgovorno lice

        cy.get('#prikaz').select('50')

        cy.get('table')
            .find('tbody>tr')
            .contains('Steva Stevanovic')
            .siblings().last().as('stevinodugme')    

        cy.get('@stevinodugme').click({ force: true })

        cy.get('#submit').click()

        cy.get('.toast-message')
        .should('contain', 'Kvar uspesno dodat')
    })
})
//  