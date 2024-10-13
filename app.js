let form = document.querySelector("form");
let result = document.getElementById("result");
let input = document.getElementById("search");
let meal = [];

async function PartFetch(value) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    .then((res) => res.json())
    .then((data) => (meal = data.meals));
}

function PartDisplay() {
  if (meal === null) {
    result.innerHTML = `<h2>Aucune information</h2>`;
  } else {
    meal.length = 12;
    result.innerHTML = meal
      .map((meals) => {
        let ingredients = [];
        for (let i = 1; i < 21; i++) {
          if (meals[`strIngredient${i}`]) {
            let Ingredient = meals[`strIngredient${i}`];
            let Measure = meals[`strMeasure${i}`];
            ingredients.push(`<li>${Ingredient} - ${Measure}</li>`);
          }
        }
        return ` 
            <li>
            <h2>${meals.strMeal}</h2>
            <p>${meals.strArea}</p>
            <img src='${meals.strMealThumb}'>
            <ul>
            ${ingredients.join("")}
            </ul>
            </li>
            `;
      })
      .join("");
  }
}

input.addEventListener("input", (e) => {
  PartFetch(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  PartDisplay();
});
