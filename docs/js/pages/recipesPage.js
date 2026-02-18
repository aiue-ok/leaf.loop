// pages/recipesPage.js
import { recipes } from "../data/recipesData.js";
import { renderRecipeList } from "../render/renderRecipes.js";

document.addEventListener("DOMContentLoaded", () => {
  renderRecipeList(recipes);
});

console.log(recipes);

// 👉 ここには
// recipes[0]
// innerHTML
// map
// 一切置かない。
