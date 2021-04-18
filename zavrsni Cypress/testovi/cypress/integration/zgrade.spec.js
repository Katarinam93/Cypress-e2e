describe('Testiranje forme za dodavanje zgrade', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Zgrade').click()
    })
    it('Uspesno dodavanje zgrade', () => {

        cy.addBuilding('Subotica', 'Ivana Milljanova', '10', '5')

        cy.get('.toast-message')
            .then($alert => {
                if ($alert.text().includes('Vec postoji zgrada na toj adresi!')) {
                    return $alert
                } else {
                    cy.contains('Pregled').click()
                    cy.get('#prikaz').select('50')   //biramo prikaz svih 

                    cy.get('table')
                        .find('tbody>tr')
                        .should('contain', 'Ivana Milljanova 10, Subotica') //trebalo bi da dozvoli brisanje zgrade
                }
            })
    })

    it('Prazna polja', () => {
        cy.get('#mesto').clear()

        cy.get('#ulica').clear()

        cy.get('#broj').clear()

        cy.get('#brojStanova').clear()

        cy.get('.invalid-feedback')
            .should('contain', 'Ovo polje ne sme biti prazno!')

        cy.get('.col-lg-9 > .btn-primary')
            .should('be.disabled')
    })

    it('Unosimo stringove u polja: broj i brojStanova ', () => {
        cy.get('#broj')
            .type('dva')
            .should('have.text', '')

        cy.get('#brojStanova')
            .type('dva')
            .should('have.text', '')

    })

    it('Polje broj sa vise od 3 karaktera', () => {
        cy.addBuilding('Valjevo', 'JNA', '1235', '3')

        cy.get('.toast-message')
            .then($alert => {
                if ($alert.text().includes('Vec postoji zgrada na toj adresi!')) {
                    return $alert
                } else {
                    cy.contains('Pregled').click()
                    cy.get('#prikaz').select('50')

                    cy.get('table')
                        .find('tbody>tr')
                        .should('contain', 'JNA 123, Valjevo')
                        .and('not.contain', '1235') //it should still have only 3 characters
                }
            })
    })

    it('Samo space u poljima mesto i ulica', () => {        //THIS SHOULD NOT BE POSSIBLE 
        cy.addBuilding(' ', ' ', '754', '7')

        cy.get('.toast-message')
            .then($alert => {
                if ($alert.text().includes('Vec postoji zgrada na toj adresi!')) {
                    return $alert
                } else {
                    cy.contains('Pregled').click()
                    cy.get('#prikaz').select('50')

                    cy.get('table')
                        .find('tbody>tr').last()
                        .find('td').first()
                        .should('contain', '754,') //trebalo bi da dozvoli brisanje zgrade
                }
            })
    })
})

