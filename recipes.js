class Recipe {
	constructor(name, ingredients) {
		this.name = name;
		this.ingredients = ingredients;
	}
}

tacos = new Recipe("Grilled Shrimp Tacos", ["shrimp", "butter", "limes", "tortillas", "salsa"]);

potpie = new Recipe("Chicken and Vegetable Potpie", ["milk", "olive oil", "carrots", "peas", "crust"]);

sandwich = new Recipe("Avocado, Prosciutto, and Egg Open-Faced Sandwich", ["avocado", "prosciutto", "eggs", "bread"]);

var recipeArray = [tacos, potpie, sandwich];

var clientIngr = ["shrimp", "butter", "limes", "tortillas", "salsa", "milk", "olive oil", "carrots", "peas", "crust"];

function recipeMatcher() {
	matchedRecipes = [];
	recipeArray.forEach(function(recipe){
		var matchCounter = 0;
		recipe.ingredients.forEach(function(ingr){
			clientIngr.forEach(function(clients){
				if (clients === ingr) {
					matchCounter += 1;
				}
			});
		});
		if (matchCounter === recipe.ingredients.length) {
			matchedRecipes.push(recipe);
			console.log("finished looping through..." + recipe.name + "- matched ingredients: " + matchCounter);
		} else {
			console.log("finished looping through..." + recipe.name + "- matched ingredients: " + matchCounter);
		}
		matchCounter = 0;
	});
	matchedRecipes.forEach(function(recipe){
		console.log('this is a matched recipe(s): '+ recipe.name);
	});
}

recipeMatcher();
