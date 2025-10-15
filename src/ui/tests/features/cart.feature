@cart
Feature: Cart

	Scenario: User adds a product to the cart
		Given "Yoany" opens the "product details" page
		And the button to add a product to the cart is visible
		When "Yoany" clicks the button to add the product to the cart
		Then a confirmation message is displayed for "product added to cart"
		And the cart quantity is "1"

	Scenario: User goes to the cart page
		Given "Yoany" opens the "home" page
		And the cart quantity is "1"
		When  "Yoany" opens the "cart" page
		Then "Yoany" sees a table with the product details

	Scenario: User increases the quantity of products in its cart
		Given the cart quantity is "1"
		And "Yoany" opens the "cart" page
		When "Yoany" changes the product quantity from "1" to "2"
		Then a confirmation message is displayed for "product quantity changed"
		And the total amount of the "product line" is updated to "$28.30"
		And the total amount of the "cart total" is updated to "$28.30"
