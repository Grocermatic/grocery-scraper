# Grocery Suggester
Minimise grocery cost and time, while meeting dietary guidelines.

Note: Micronutrients are not considered.

### Improve Nutritional Intake
Estimated [10 - 20% of Australians meet fruit and vegetable recommendation](https://www.abs.gov.au/statistics/health/health-conditions-and-risks/dietary-behaviour/2020-21), most averaging half the recommended servings. Is this you?

### Reduce Grocery Expenditure
Meal prepping for $1.8 per meal equates to $2000/year/person compared to the average of $5000/year/person on groceries.
Perhaps this could be attributed to the high cost of eating out, ranging from $10 - $20 per meal.

### Decrease food prep time
Optimise for bulk buying and meal prepping. Healthy food should be convenient.



## Functional and Technical Requirements
Site scraper:
  * Store data from - Coles, Woolworths, Aldi.
  * Store link, price, weight, number of servings and nutrition.
  * On demand, low resource server - once a month.

Constraint engine - this is a high dimensional linear optimisation problem:
  * Optimise cost within specified ranges.
  * Follow dietary guidelines and servings by age.

Browser interface:
  * Dynamic rendering based on filters
  * Custom filters
  * Export grocery list



## Possible Approaches
* Use additional and artificial constrains to reduce search space.
