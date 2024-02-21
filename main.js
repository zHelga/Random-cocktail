const api_url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const btn = document.querySelector('.btn');
const img = document.querySelector('.cocktail__img img');
const cocktailName = document.querySelector('.cocktail__name');
let ingredients = document.querySelector('.cocktail__list');
let instruction = document.querySelector('.cocktail__instruction p');
let arrIngr = [];
let arrMeasure = [];


async function getCocktail() {
	try {
		const response = await fetch(api_url);
		const recipe = await response.json();

		img.src = recipe.drinks[0].strDrinkThumb;
		cocktailName.innerHTML = recipe.drinks[0].strDrink;
		instruction.innerHTML = recipe.drinks[0].strInstructions;

		for(let key in recipe.drinks[0]) {
			if(key.includes('strIngredient')) {
				arrIngr.push(recipe.drinks[0][key]);
				
			}
			if(key.includes('strMeasure')) {
				arrMeasure.push(recipe.drinks[0][key]);
				
			}
		}

		for(let i = 0; i < arrIngr.length; i++) {
			if(arrIngr[i] !== null) {
				const ingredientsLI = document.createElement('li')
				let ingredient = arrIngr[i];
				let measurement = arrMeasure[i]
				ingredientsLI.textContent = `${ingredient}: ${measurement}`
				ingredients.append(ingredientsLI);
				
			}
		}
	} catch {
		console.log(error);
	}
}
getCocktail();
btn.addEventListener('click', () => {
	ingredients.querySelectorAll('li').forEach(elem => {
		elem.remove();
	})
	arrIngr = [];
	arrMeasure = [];
	getCocktail();
	
})