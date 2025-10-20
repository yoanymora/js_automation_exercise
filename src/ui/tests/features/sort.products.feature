@sort
Feature: Sort products

	Scenario: User sorts products by price from highest to lowest
		Given "Yoany" opens the "home" page
		And the first product listed in the products matrix is "Combination Pliers"
		When "Yoany" sorts the products by price from "highest to lowest"
		Then the products matrix is updated after "sort"
		And the first product of the products matrix after "sort" is "Drawer Tool Cabinet"

	Scenario: User sorts products by price from lowest to highest
		Given "Yoany" opens the "home" page
		And the first product listed in the products matrix is "Combination Pliers"
		When "Yoany" sorts the products by price from "lowest to highest"
		Then the products matrix is updated after "sort"
		And the first product of the products matrix after "sort" is "Washers"
