@filter
Feature: Filter products

  	Scenario: User filters products by brand
		Given "Yoany" opens the "home" page
		And the first product listed in the products matrix is "Combination Pliers"
		When "Yoany" filters products by brand "Forge Flex Tools"
		Then the products matrix is updated after "filter"
		And the first product of the products matrix after "filter" is "Claw Hammer with Shock Reduction Grip"

  	Scenario: User filters products by price range
		Given "Yoany" opens the "home" page
		And the product "Bolt Cutters" is listed in the products matrix
		When "Yoany" changes the price range from 1 to 39
		Then "Yoany" see that the price range selector was updated to "39"
		And the product "Bolt Cutters" is not listed in the products matrix
