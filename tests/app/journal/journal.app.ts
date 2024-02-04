import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature('tests/app/journal/journal.app.feature');

defineFeature(feature, (test) => {
  test('I can create a new journal entry', ({given, when, then}) => {
    given('I am on the homepage page', () => {
      console.log('hi there');
    });

    when(/^I add a new journal called "(.*)"$/, (entry) => {
      console.log('entry', entry);
    });

    then(/^I should see the journal "(.*)" in the list of journal entries$/, (entry) => {
      console.log('entry', entry);
    });
  });
});