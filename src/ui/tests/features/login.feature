@login
Feature: Log in

  Scenario: User account is blocked after 3 failed attempts to log in
    Given "Yoany" is registered in the webpage
	And "Yoany" opens the "login" page
    When "Yoany" tried to log in 3 times with incorrect credentials
    Then a message indicating that the account is blocked is displayed
