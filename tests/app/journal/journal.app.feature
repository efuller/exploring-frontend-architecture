Feature: Journal Management
  As a user I should be able to manage my journal entries.

  Scenario: I can create a new journal entry
    Given I am on the homepage page
    When I add a new journal called "The weather is great"
    Then I should see the journal "The weather is great" in the list of journal entries

  Scenario: A journal can be deleted from the list
    Given There is a journal named "The weather is great" in the journal list
    When I delete the journal item from the list
    Then The journal item "The weather is great" should no longer be in the list

  Scenario: A journal can be set as a favorite
    Given There is a journal named "The weather is great" in the journal list
    When The journal entry is set as a favorite
    Then The journal entry "The weather is great" should be marked as a favorite
    And The favorite journal "The weather is great" should be saved to the client storage repository

#  Scenario: Delete a journal that is marked as a favorite
#    Given There is a journal named "steak" in the journal list
#    When I delete the journal item from the list
#    And It is set for pending deletion
#    And I confirm the deletion
#    Then The journal item "steak" should no longer be in the list

# -- Example of a Scenario Outline --
#  Scenario Outline: User creates a new journal
#    Given the user is on the homepage page
#    And the form for adding a new journal is visible
#    When the user enters a title of <title> and content of <content> and clicks the submit button
#    Then the page should display the title of <title> and content of <content>
#
#    Examples:
#      | title       | content                |
#      | Test Journal| Sample journal content |
