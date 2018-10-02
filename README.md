Test framework is built using cypress & docker.

_How to specify the URL to be tested when test is running locally/without docker:_

In CLI, go to the root directory of the project and run: 

`npm install`

This will install the needed dependencies (cypress actually). Then run 

`CYPRESS_baseUrl=http://localhost:3000 cypress run`

where CYPRESS_baseUrl is the link where the System Under test is running

Default base url (if not specified in CLI) is http://localhost:3001

_How to run test in docker container:_

`docker-compose run cypress ./node_modules/.bin/cypress run --config baseUrl=http://172.25.15.18:3001
`

where baseUrl is the network url where the system under test is running

**NOTE:** when using cypress it is impossible to test the persistence of filters 
between tabs since multiple tabs/multiple browser instances are not supported 
in cypress. See https://docs.cypress.io/guides/references/trade-offs.html#Multiple-tabs
. There might be workarounds but I assumed that for the test task it would be 
sufficient to use only Cypress framework means. 
So test for checking filter persistence after page refresh is added instead.

**NOTE 2:** there are few further improvements that can be done for current test framework. For instance, getting the 
number of Crew Member cards on ethe beginning of testing programmatically, not relying on initial state of app, as it 
is done now. Next one would be integrating cypress tests into System Under Test repository and modifying docker-compose
 file to run first SUT in one docker container, and then to run cypress tests in another docker container against 
 the system that was started on previous step.

**Issues found:**
- _**BUG #1**_: Clicking on Clear button does not clear the contents of filter fields 
(name, city), only clears the applied filter to make all the Crew cards visible.

Steps to reproduce: 

1 Input some values in Name field and City field (so that the amount of cards is going to be reduced), press Submit button

=> Crew cards are filtered according to filter parameters, some cards are hidden

2 Click on Clear button

=> all the crew cards are visible again

_Expected result:_ the Name field and City field are also cleared

_Current result:_ the fields still contain the values that were input on step 1

- _**IMPROVEMENT #1**_ Fix mistypes for divs with classnames .CrewMemeber-photo and .CrewMemeber-Name

.CrewMember-photo and .CrewMember-name are expected

- _**IMPROVEMENT #2**_ Add a description next to/above Name/City input fields because it is unclear what are the 
functions of those fields. Taking into account that there is Submit button, 
my first guess was that those fields are to create a new Crew Member card, not filter existing cards. 

- _**IMPROVEMENT #3**_ Add a class to button '<' - currently it is described solely as `<button type="button"> < </button>` 
which makes it inconvenient to reference the element (taking into account that cypress uses css only)
