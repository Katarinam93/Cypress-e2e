/**
 * 2. Testirati dodavanje institucije:
• Login kao administrator (admin@gmail.com, Bar5slova)
• Preći na stranicu sa institucijama
• Istestirati sva polja forme za dodavanje institucije
• Dodati instituciju sa sledećim podacima:
• Email: opstina@gmail.com
• Lozinka: Bar6slova
• Naziv: Opstina
• Mesto: Novi Sad
• Ulica: Bulevar Oslobodjenja
• Broj: 11
• Broj telefona: 1122334455
• Proveriti da li je institucija dodata (proveriti na dva različita načina)
• Logout
 */

describe('Dodavanje date institucije', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Institucije').click()
    })

    it('pozitivan test na kom dodajemo datu instituciju', () => {

        cy.addInstitution('opstina@gmail.com', 'Bar6slova', 'Opstina', 'Novi Sad', 'Bulevar Oslobodjenja', '11', '1122334455')

        cy.get('.col-lg-9 > .btn-primary').click()           //zakomentarisano u suportu zbog negativnih testova

        cy.get('.toast-message')
            .should('contain', 'Uspesno ste registrovali instituciju')      //hvatamo success poruku

        cy.contains('Pregled').click()    //idemo na pregled institucija

        cy.get('#filter')   //u polje pretraga unosime email
            .type('opstina@gmail.com')

        cy.get('.row > .btn').click()       //klik na dugme za potvrdu pretrage

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'opstina@gmail.com')     //proveravamo da li nam tabela sadrzi dati email

    })

    it('dodajemo vec postojecu instituciju', () => {

        cy.addInstitution('opstina@gmail.com', 'Bar6slova', 'Opstina', 'Novi Sad', 'Bulevar Oslobodjenja', '11', '1122334455')

        cy.get('.col-lg-9 > .btn-primary').click()

        cy.get('.toast-message')
            .should('contain', 'E-mail adresa: opstina@gmail.com je zauzeta!')
    })

    it('Testiramo input polje za email: Neispravan email', () => {

        cy.get('#email')
            .clear()
            .type('aaaaaa')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a')        //samo sa @

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.')       //sa tackom

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.a')      //sa jednim karakterom posle tacke

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.aa')      //sa dva karaktera posle tacke i ovo bi trebalo da prodje

        cy.get('.invalid-feedback')
            .should('not.be.exist')
    })

    it('Testiramo input polje za lozinku: Neispravna lozinka', () => {

        cy.get('#lozinka')
            .clear()
            .type('aaaaaaa')     //samo mala slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('AAAAAAA')        //samo velika slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('1111111')       //samo brojevi

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('aaaa111')      //bez velikog slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('AAAA111')      //bez malih slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('aaaaAAA')      //bez  BROJEVA

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
    })

    it('space-ovi na input poljima za naziv, mesto i ulicu', () => {

        cy.addInstitution('sud@gmail.com', 'Bar6slova', ' ', ' ', ' ', '11', '1122334455')  //na tex polja saljemo samo jedan space

        //ovo ce pasti jer u aplikaciji postoji bag jer space karakteri ne bi trebalo da prodju, a prolaze
        cy.get('.col-lg-9 > .btn-primary')
            .should('be.disabled')
    })

    it('Granicne vrednosti za lozinku: 5 karaktera', () => {

        cy.addInstitution('pet@gmail.com', 'Bar6s', 'aaaaa', 'Novi Sad', 'Bulevar Oslobodjenja', '10', '1122334455')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')

        cy.get('.col-lg-9 > .btn-primary')
            .should('be.disabled')

    })

    it('Granicne vrednosti za lozinku: 6 karaktera', () => {

        cy.addInstitution('sest@gmail.com', 'Bar6sl', 'aaaaaaa', 'Novi Sad', 'Bulevar Oslobodjenja', '9', '1122334455')

        cy.get('.col-lg-9 > .btn-primary')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Uspesno ste registrovali instituciju')      //hvatamo success poruku

        cy.contains('Pregled').click()    //idemo na pregled institucija

        cy.get('#filter')   //u polje pretraga unosime email
            .type('sest@gmail.com')


        cy.get('.row > .btn').click()       //klik na dugme za potvrdu pretrage

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'sest@gmail.com')
    })

    it('Granicne vrednosti za lozinku: 7 karaktera', () => {

        cy.addInstitution('sedam@gmail.com', 'Bar6slo', 'aaaaaaa', 'Novi Sad', 'Bulevar Oslobodjenja', '9', '1122334455')

        cy.get('.col-lg-9 > .btn-primary')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Uspesno ste registrovali instituciju')      //hvatamo success poruku

        cy.contains('Pregled').click()    //idemo na pregled institucija

        cy.get('#filter')   //u polje pretraga unosime email
            .type('sedam@gmail.com')


        cy.get('.row > .btn').click()       //klik na dugme za potvrdu pretrage

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'sedam@gmail.com')
    })

    it('Prazna polja u svim inputima', () => {

        cy.get('#email')
            .clear()

        cy.get('#lozinka')
            .clear()

        cy.get('#naziv')
            .clear()

        cy.get('#mesto')
            .clear()

        cy.get('#ulica')
            .clear()

        cy.get('#broj')
            .clear()

        cy.get('#brojTelefona')
            .clear()

        cy.get('.invalid-feedback')
            .should('contain', 'Ovo polje ne sme biti prazno!')

        cy.get('.col-lg-9 > .btn-primary')
            .should('be.disabled')
    })

    it('Pokusamo uneti nesto sto nije broj u polja za broj', () => {

        cy.get('#broj')
            .clear()
            .type('dva')
            .should('be.empty')         //unsoimo string dva, ali polje ostaje prazno

        cy.get('#brojTelefona')
            .clear()
            .type('dva')
            .should('be.empty')

    })

    after(() => {
        cy.contains('Izlogujte se').click()      //klik na izlogovati se

        cy.get('.loginForm')
            .should('contain', 'Logovanje') //provera da smo ipak na stranici za logovanje

        cy.url()
            .should('include', '/logovanje')    //provera da li url sadrzi logovanje
    })
})

