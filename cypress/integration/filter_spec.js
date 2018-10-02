import FilterPage from '../pageObjects/FilterPage'

describe('Filtering:', function() {

    it('by name', function() {
        const filterPage = new FilterPage();
        let nameFilter1 = "li";
        filterPage.inputNameFilter(nameFilter1)
            .clickSubmitButton();

        filterPage.getCrewMembersNames()
            .should(($container) => {
                const nameElements = $container.map((i, el) =>
                    Cypress.$(el).text());
                const names = nameElements.get();

                expect(names).to.have.length(2);
                names.forEach(currentName =>
                    expect(currentName).to.contain(nameFilter1))
        });

        let nameFilter2 = "zzz";
        filterPage.inputNameFilter(nameFilter2)
            .clickSubmitButton();
        filterPage.getCrewMembersNames().should('not.exist');
    });

    it('by city', function() {
        let cityFilter1 = "er";
        const filterPage = new FilterPage();
        filterPage.inputCityFilter(cityFilter1)
            .clickSubmitButton();
        filterPage.getCrewMembersCities()
            .should(($container) => {
                const texts = $container.map((i, el) =>
                 Cypress.$(el).text());
                const cities = texts.get();

                expect(cities).to.have.length(3);
                cities.forEach(currentCity =>
                    expect(currentCity).to.contain(cityFilter1))

        });

        let cityFilter2 = "zzz";
        filterPage.inputCityFilter(cityFilter2)
            .clickSubmitButton();
        filterPage.getCrewMembersCities().should('not.exist')
    });


     it('by name and city combination', function() {
         const filterPage = new FilterPage();
         filterPage.inputNameFilter('e')
             .inputCityFilter('w')
             .clickSubmitButton();
         filterPage.getCrewMembersNames().should('have.length', 1);
         filterPage.getCrewMembersNames().contains('e');
         filterPage.getCrewMembersCities().contains('w');
     });


    it('Clear button should cancel filtering and clear the filter fields', function () {
        let nameFilter = "fakeFilter";
        const filterPage = new FilterPage();
        filterPage.inputNameFilter(nameFilter)
            .inputCityFilter(nameFilter)
            .clickSubmitButton();
        filterPage.getCrewMembersNames().should('have.length', 0);
        filterPage.clickClearButton();
        filterPage.getCrewMembersNames().should('have.length', 5);
        filterPage.getNameInput().should('have.value', '');
        filterPage.getCityInput().should('have.value', '');
    });


    it('refreshing page preserves the filters', function () {
        let nameFilter = "cardiff";
        const filterPage = new FilterPage();
        filterPage.inputCityFilter(nameFilter)
            .clickSubmitButton();
        filterPage.getCrewMembersNames().should('have.length', 1);
        cy.reload();
        filterPage.getCityInput().should('have.value', nameFilter);
        filterPage.getCrewMembersNames().should('have.length', 1);
    })
});