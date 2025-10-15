@language
Feature: Language selector

	Background:
		Given "Yoany" opens the "home" page

	Scenario: User switches the language from English to Spanish
		Given the website language is "english"
		When "Yoany" switches the language to "spanish"
		Then the language selector displays the label "ES"

	Scenario: User switches the language from Spanish to French
		Given the website language is "spanish"
		When "Yoany" switches the language to "french"
		Then the language selector displays the label "FR"
		And the currency symbols of product prices change from "$" to "€"
