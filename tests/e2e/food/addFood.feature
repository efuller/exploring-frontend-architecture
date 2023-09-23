Feature: Add Food
  As a user
  I want to be able to add a new food

  Scenario: Adding a food
    Given The app can be accessed
    When The user adds a new food called steak
    Then The user should be able to verify that steak is added to the list