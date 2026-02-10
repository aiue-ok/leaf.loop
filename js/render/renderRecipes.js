export function renderRecipeList(recipes) {
  const container = document.getElementById("recipe");
  if (!container) return;

  container.innerHTML = recipes
    .map((recipe) => {
      const prep = recipe.steps?.prep ?? [];
      const hasPrep = prep.length > 0 ? "あり" : "なし";

      return `
        <article class="recipe">
          <div class="recipe_bar">
            <h2 class="recipe_title">${recipe.title}</h2>
            <div class="recipe_detail">
              <p class="meta time">⏱ ${recipe.time}</p>
              <p class="meta ingredients">
                主な材料：${recipe.mainIngredients.join("・")}
              </p>
              <p class="meta prep">
                下準備：${hasPrep}
              </p>
              <img src="${recipe.image}" alt="" class="meta recipe_image">
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  attachToggle();
}

// 「下に開く」仕込み
function attachToggle() {
  document.querySelectorAll(".recipe_bar").forEach((bar) => {
    bar.addEventListener("click", () => {
      bar.parentElement.classList.toggle("open");
    });
  });
}
