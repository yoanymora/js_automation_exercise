Feature: Language selector

  Scenario: User switches the language from EN to ES
    Given the website set to English (EN)
    When a user switches the language to Spanish (ES)
    Then all website labels are translated into Spanish
    And the language selector displays the label "ES"

  Scenario: User switches the language from ES to FR
    Given the website set to Spanish (ES)
    When a user switches the language to French (FR)
    Then all website labels are translated into French
    And the currency symbols of product prices change from pesos "$" to euros "€"
    And the language selector displays the label "FR"

Feature: Sort products

  Background:
    Given a product named "Super Hammer"
    And the product's price is $100
    And a product named "Pliers"
    And the product's price is $15

  Scenario: User sorts products by price from highest to lowest
    Given a user is in the home page
    When the user sorts the products by price from highest to lowest
    Then the user should see the "Super Hammer" product at the beginning of the displayed products
    And the user should see the "Pliers" product after the "Super Hammer" product

  Scenario: User sorts products by price from lowest to highest
    Given a user is in the home page
    When the user sorts the products by price from lowest to highest
    Then the user should not see the "Super Hammer" product at the top of the displayed products

Feature: Filter products

  Background:
    Given a product named "Regular Hammer"
    And the product's price is $39.99
    And a product named "Saw"
    And the product's price is $39

  Scenario: User filters products by brand
    Given a user is in the home page
    When the user filters products by brand "Trupper"
    Then the user should see products of the "Trupper" brand
    And the user should not see products of other brands

  Scenario: User filters products by price range
    Given a user is in the home page
    When the user changes the price range from 1 to 39
    Then the user should not see the "Regular hammer" product displayed
    And the user should see the "Saw" product displayed

Feature: Cart

  Scenario: User adds a product to the cart
    Given a user that is in the "Supercool cabinet" product details page
    And the user has no products in the cart
    When the user adds 1 "Supercool cabinet" to the cart
    Then the user should see a message at the top right of the page indicating the product was added successfully
    And the cart logo shows the number 1 indicating the quantity of products in the cart

  Scenario: User goes to the cart page
    Given a user with a product in its cart
    When the user goes to the cart page
    Then the user is redirected to the cart page
    And sees the product in its cart
    * product quantity
    * product price per unit
    * total price
    * an option to proceed to the checkout
    * an option to erase a product from the cart for each product

  Scenario: User increases the quantity of products in its cart
    Given a user with 1 product in its cart
    And the user is located at the cart page
    When the user changes the product's quantity from 1 to 2
    Then a message is shown to indicate that the product's quantity was updated
    And the total price of the product's line is updated
    And the sum of the total amount of the cart is updated

Feature: Log in

  Scenario: User's account is blocked after 3 failed attempts to log in
    Given a user not logged in the website
    And the user has a website account
    And the user is in the log in page
    When the user tries to log in 3 times with incorrect credentials
    Then a message indicating that the account is blocked is displayed
    And the user should not log in
