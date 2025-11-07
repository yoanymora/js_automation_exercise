@login
Feature: Log in

	Scenario: User account is blocked after 3 failed attempts to log in
		Given "Yoany" is registered in the webpage
		And "Yoany" opens the "login" page
		When "Yoany" tried to log in 3 times with incorrect credentials
		Then a message indicating that the account is blocked is displayed

	Scenario Outline: User tries to create an account with different passwords
		Given "Yoany" opens the "register" page
		And "Yoany" filled all the registration fields except email and password
		When "Yoany" add the following email: "test@test.com" and password: "<password>"
		And submit the register form
		Then "Yoany" get the following message: "<message>"

		Examples:
		| password      | message |
		| con           | Password must be minimal 6 characters long.\nPassword can not include invalid characters. |
		| contrasenia1# | Password can not include invalid characters. |
