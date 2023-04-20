# Grocery Suggester
Minimise grocery cost and time, while meeting dietary guidelines.

Note: Micronutrients are not considered.

### Reduce Grocery Expenditure
Meal prepping for $1.5 per meal can save over $3000/year/person for an average Australians.
On average, Australians spend $5000/year/person on groceries.
Perhaps this could be attributed to the high cost of eating out, ranging from $10 - $20 per meal.

### Increase Nutritional Intake
Estimated [less than 10% of Australians meet fruit and vegetable recommendation](https://www.abs.gov.au/statistics/health/health-conditions-and-risks/dietary-behaviour/2020-21). 



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
