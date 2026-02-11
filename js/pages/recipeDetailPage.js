import { recipes } from "../data/recipesData.js";

function renderRecipeDetail(recipe) {
  const container = document.querySelector(".recipe-detail");

  container.innerHTML = `
    <article class="recipe">
      <h2>${recipe.title}</h2>

      <div class="recipe_image">
        <img src="${recipe.image}" alt="">
      </div>

      <ul class="tags">
        ${recipe.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>

      <h3>材料</h3>
      <div class="recipe_card">
        <ul class="ingredients">
          ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
        </ul>

        ${
          recipe.steps.prep.length > 0
            ? `
        <h4>下ごしらえ</h4>
        <ol>
          ${recipe.steps.prep.map((s) => `<li>${s}</li>`).join("")}
        </ol>
        `
            : ""
        }
      </div>

      <h3>手順</h3>
      <div class="recipe_card">
        <ol>
          ${recipe.steps.cook.map((s) => `<li>${s}</li>`).join("")}
        </ol>
      </div>

      <h3>ポイント</h3>
      <div class="recipe_card_accent">
        <ul class="tips">
          ${recipe.tips.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

// ここが起動部分
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const recipe = recipes.find((r) => r.id === id);
console.log("selected recipe:", recipe);
if (recipe) {
  renderRecipeDetail(recipe);
} else {
  console.error("recipe not found");
}
