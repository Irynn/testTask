import FilterPage from '../pageObjects/FilterPage'

describe('Moving Crew cards', function () {
    it('from Applied to Interviewing and Hired columns and back', function () {
        const filterPage = new FilterPage();

        //assuming initial state of app to be 4 cards in Applied, 0 in Interviewing, 1 in Hired columns

        filterPage.getAppliedCrewMembers().should('have.length',4);
        filterPage.getInterviewingCrewMembers().should('have.length',0);
        filterPage.getHiredCrewMembers().should('have.length', 1);
        //verifying that cards in Applied column cannot be moved to the Left
        filterPage.getMoveLeftButton("appliedMembers").should('not.exist');
        //verifying that all 4 cards in Applied column can be moved to the right
        filterPage.getMoveRightButton("appliedMembers").should('have.length', 4);
        //verifying that cards on the Hired column cannot be moved to the right
        filterPage.getMoveRightButton("hiredMembers").should('not.exist');

        filterPage.getMoveRightButton("appliedMembers").first().click();
        filterPage.getAppliedCrewMembers().should('have.length',3);
        filterPage.getInterviewingCrewMembers().should('have.length',1);
        filterPage.getHiredCrewMembers().should('have.length', 1);
        //verifying that card in Interviewing column can be moved both ways
        filterPage.getMoveLeftButton("interviewingMembers").should('have.length',1);
        filterPage.getMoveRightButton("interviewingMembers").should('have.length',1);

        filterPage.getMoveRightButton("interviewingMembers").click();
        filterPage.getAppliedCrewMembers().should('have.length',3);
        filterPage.getInterviewingCrewMembers().should('have.length',0);
        filterPage.getHiredCrewMembers().should('have.length', 2);

        filterPage.getMoveLeftButton("hiredMembers").click();
        filterPage.getAppliedCrewMembers().should('have.length',3);
        filterPage.getInterviewingCrewMembers().should('have.length',1);
        filterPage.getHiredCrewMembers().should('have.length', 1);
    });

    it('filtering does not affect position of cards within columns', function () {
        const filterPage = new FilterPage();
        filterPage.inputCityFilter('hereford')
            .clickSubmitButton();
        filterPage.getAppliedCrewMembers().should('have.length',1);
        filterPage.getInterviewingCrewMembers().should('have.length',0);
        filterPage.getHiredCrewMembers().should('have.length', 0);

        filterPage.getMoveRightButton("appliedMembers").first().click();
        filterPage.getAppliedCrewMembers().should('have.length',0);
        filterPage.getInterviewingCrewMembers().should('have.length',1);
        filterPage.getHiredCrewMembers().should('have.length', 0);

        filterPage.clickClearButton();
        filterPage.getAppliedCrewMembers().should('have.length',3);
        filterPage.getInterviewingCrewMembers().should('have.length',1);
        filterPage.getHiredCrewMembers().should('have.length', 1);
    })
});