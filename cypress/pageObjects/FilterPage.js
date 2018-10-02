'use strict';

class FilterPage {
    constructor(){

    }
    visit() {
        cy.visit('/');
        return this;
    }

    getNameInput(){
        return cy.get("#name")
    }

    getCityInput(){
        return cy.get("#city")
    }

    getCrewMembersNames(){
        return cy.get('.CrewMemeber-name > *:first-child')
    }

    getCrewMembersCities(){
        return cy.get('.CrewMemeber-name > *:last-child')
    }

    getAppliedCrewMembers(){
        return cy.get('.App-column').eq(0).find('.CrewMember-container').as('appliedMembers')
    }

    getInterviewingCrewMembers(){
        return cy.get('.App-column').eq(1).find('.CrewMember-container').as('interviewingMembers')
    }

    getHiredCrewMembers(){
        return cy.get('.App-column').eq(2).find('.CrewMember-container').as('hiredMembers')
    }

    getMoveRightButton(crewMemberCard){
        const alias_ = '@'+crewMemberCard;
        return cy.get(alias_).find('.CrewMember-up');
    }

    //due to limitations of cypress and poorly defined '<' button, returns only first '<' button in column
    //workaround is possible but this would exceed the level of technical test
    getMoveLeftButton(crewMemberCard){
        const alias_ = '@'+crewMemberCard;
        return cy.get(alias_).contains('<');
    }


    inputNameFilter(filterString){
        this.getNameInput().type(filterString);
        return this;
    }

    inputCityFilter(filterString){
        this.getCityInput().type(filterString);
        return this;
    }

    clearNameField(){
        this.getNameInput().clear();
        return this;
    }

    clearCityInput(){
        this.getCityInput().clear();
        return this;
    }

    clickSubmitButton(){
        cy.get('button[type="submit"]').click()
    }

    clickClearButton(){
        cy.contains("Clear").click()
    }
}

export default FilterPage;