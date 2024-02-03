Feature: Add Journal
  As a user
  I want to be able to add a new journal

  Scenario: Adding a journal
    Given The app can be accessed
    When The user adds a new journal called steak
    Then The user should be able to verify that steak is added to the list