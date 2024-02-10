Feature: Journal Management
  As a user I should be able to manage my journal entries.

  Background:
    Given There is a journal named "The weather is great" in the journal list

  Scenario: I can create a new journal entry
    When I add a new journal called "Took out the trash"
    Then I should see the journal "Took out the trash" in the list of journal entries

  Scenario: A journal can be deleted from the list
    When I delete the journal item from the list
    Then The journal item "The weather is great" should no longer be in the list

  Scenario: A journal can be set as a favorite
    When The journal entry is set as a favorite
    Then The journal entry "The weather is great" should be marked as a favorite
    And The favorite journal "The weather is great" should be saved to the client storage repository

#  Scenario: Delete a journal that is marked as a favorite
#    And The journal entry is set as a favorite
#    When I delete the journal item from the list
#    And It is set for pending deletion
#    And I confirm the deletion
#    Then The journal item "The weather is great" should no longer be in the list
#    And The favorite journal "The weather is great" should be removed from the client storage repository
#
#  Scenario: A journal pending delete can be cancelled
#    And The journal entry is set as a favorite
#    When I delete the journal item from the list
#    And It is set for pending deletion
#    When I cancel the deletion
#    Then The journal item "The weather is great" should still be in the list
#    And The pending deletion should be removed
