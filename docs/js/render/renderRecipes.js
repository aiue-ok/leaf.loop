export function renderRecipeList(recipes) {
  const container = document.getElementById("recipe");
  if (!container) return;

  container.innerHTML = recipes
    .map((recipe) => {
      const prep = recipe.steps?.prep ?? [];
      const hasPrep = prep.length > 0 ? "あり" : "なし";

      return `
      <a href="recipe.html?id=${recipe.id}" class="recipe-link">
        <article class="recipe">
          <div class="recipe_bar">
            <h2 class="recipe_title">${recipe.title}</h2>
                <div class="recipe_detail">
      <div class="recipe_detail-wrapper">
        <div class="recipe_image-box">
          <img
            src="${recipe.image}"
            alt="${recipe.image_alt}"
            class="meta recipe_image"
          />
        </div>
        <div class="recipe_topic">
          <p class="meta time">⏱ ${recipe.time}</p>
          <p class="meta ingredients">
            主な材料：${recipe.mainIngredients.join("・")}
          </p>
          <p class="meta prep">下準備：${hasPrep}</p>
          <p class="meta tags">${recipe.tags}</p>
        </div>
      </div>
    </div>
          </div>
        </article>
        </a>
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
