describe('Testiranje logina', () => {

    it('pozitivni test', () => {
        cy.login('admin@gmail.com', 'Bar5slova')

        cy.contains('Izlogujte se')
            .should('have.text', 'Izlogujte se')

        cy.get('.nav > :nth-child(1) > .nav-link')
            .should('contain', 'admin@gmail.com')

        cy.contains('Zgrade')
            .should('have.attr', 'href', '/zgrade')

        cy.contains('Stanari')
            .should('have.attr', 'href', '/stanari')

        cy.url().should('contain', 'pocetna')
    })
    //------------------------------------------------------------------------------------------------------------------------

    it('prazna polja', () => {

        cy.visit('')        //podesen je base url pa mi treba samo prazan string

        cy.get('#email')
            .clear()

        cy.get('#lozinka')
            .clear()

        cy.get('.btn')
            .click()

        cy.get('.alert')
            .should('contain', 'Email nije validnog formata!')

    })
    //------------------------------------------------------------------------------------------------------------------------

    it('Test bez slanja emaila', () => {
        cy.login(' ', 'Bar5slova')

        cy.get('.alert')
            .should('contain', 'Email nije validnog formata!')
    })
    //------------------------------------------------------------------------------------------------------------------------

    it('Test bez slanja lozinke', () => {
        cy.login('admin@gmail.com', ' ')

        cy.get('strong')
            .should('contain', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
    })
    //------------------------------------------------------------------------------------------------------------------------

    it('Test: neispravan email', () => {
        cy.login('aaaa', 'Bar5slova')

        cy.get('.alert')
            .should('contain', 'Email nije validnog formata!')
    })
    //------------------------------------------------------------------------------------------------------------------------

    it('Test: pogresan email', () => {
        cy.login('katarinamarkovic93@gmail.com', 'Bar5slova')

        cy.get('.alert')
            .should('contain', 'Pogresan email ili lozinka!')
    })
    //------------------------------------------------------------------------------------------------------------------------

    it('Test: pogresna lozinka', () => {
        cy.login('admin@gmail.com', 'Bar6slova')

        cy.get('.alert')
            .should('contain', 'Pogresan email ili lozinka!')//ovo je dobro uradjena verifikacija jer u gresci ne govori da loznika nije ispravna
    })
})

describe('Testiranje logouta', () => {

    it('test logout-a', () => {

        cy.login('admin@gmail.com', 'Bar5slova')    //logovanje

        cy.get('.nav > :nth-child(1) > .nav-link')  //provera da smo na pocetnoj stranici
            .should('contain', 'admin@gmail.com')

        cy.get('.btn').click()      //klik na izlogovati se

        cy.go('back')       //pokusaj da se vratimo na pocetnu klikom na back

        cy.get('.loginForm')
            .should('contain', 'Logovanje') //provera da smo ipak na stranici za logovanje

        cy.url()
            .should('include', '/logovanje')    //provera da li url sadrzi logovanje
    })
})