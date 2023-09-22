import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('tests/acceptence/food/addFood.feature');

defineFeature(feature, (test) => {
  test('Adding a food', ({ given, when, then }) => {
    given('The app can be accessed', () => {

    });

    when('The user adds a new food called steak', () => {

    });

    then('The user should be able to verify that steak is added to the list', () => {

    });
  });
});