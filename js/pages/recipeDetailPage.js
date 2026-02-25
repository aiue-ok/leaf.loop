import { recipes } from "../data/recipesData.js";

function renderRecipeDetail(recipe) {
  const container = document.querySelector(".recipe-detail");

  container.innerHTML = `
    <article class="recipe">
    <div class="recipe_back"><a href="recipes.html">← レシピ一覧に戻る</a></div>

    <div class="recipe_head-wrapper">
      <div class="recipe_title">
      <ul class="tags">
        ${recipe.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
        <h2>${recipe.title}</h2>
        <p class="recipe_time">時間：${recipe.time}</p>
        <p class="recipe_servings">人数：${recipe.servings}</p>
      </div>
      <div class="recipe_image">
        <img
          srcset="${recipe.image.srcset}"
         src= "${recipe.image.src}"
          alt="${recipe.image.image_alt}"
          sizes="320px"
          width="${recipe.image.width}"
          height="${recipe.image.height}"
          loading="lazy" />
      </div>
    </div>

  <div class="recipe_body">
    <div class="recipe_side">
      <h3>材料</h3>
      <div class="recipe_card">
        <ul class="ingredients">
          ${recipe.ingredients
            .map(
              (i) => `
              <li>${i}</li>
              `,
            )
            .join("")}
        </ul>
      </div>
    </div>
    <div class="recipe_main">
      <h3>作り方</h3>
         ${
           recipe.steps.prep.length > 0
             ? `
              <h4>下ごしらえ</h4>
                <div class="recipe_card">
                  <ol>
              ${recipe.steps.prep
                .map(
                  (s) => `
              <li>${s}</li>
              `,
                )
                .join("")}
                  </ol>
                </div>
            `
             : ""
         }

            <h4>手順</h4>
              <div class="recipe_card">
                <ol>
              ${recipe.steps.cook
                .map(
                  (s) => `
              <li>${s}</li>
              `,
                )
                .join("")}
                </ol>
              </div>
      </div>
</div>
      <div class="recipe_tips">
        <h3>ポイント</h3>
        <div class="recipe_card_accent">
          <ul class="tips">
            ${recipe.tips
              .map(
                (t) => `
            <li>${t}</li>
            `,
              )
              .join("")}
          </ul>
        </div>
      </div>

      <h3  class="recipe_fin_heading">できあがりイメージ</h3>
      <div class="recipe_image-fin">
          <img
          src= "${recipe.image.src}"
          srcset= "${recipe.image.srcset}"
          alt= "${recipe.image.image_alt}"
          sizes="(max-width: 1000px) 100vw, 1000px"
          width= "${recipe.image.width}"
          height ="${recipe.image.height}"
          loading="lazy" />
      </div>

      <section class="recipe-actions">
        <ul class="info__list">
        <li class="info__item">
        <button  class="recipe-actions-btn">
        <svg class="i i-28 recipe_print" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -960 960 960"><path d="M640-640v-120H320v120h-80v-200h480v200zm-480 80h640zm560 100q17 0 28.5-11.5T760-500t-11.5-28.5T720-540t-28.5 11.5T680-500t11.5 28.5T720-460m-80 260v-160H320v160zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80z"/></svg>
                印刷
        </button>
        </li>
        <li class="info__item">

        <a href="mailto:?subject=レシピ&body=URL">
        <button  class="recipe-actions-btn">
        <svg class="i i-28"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -960 960 960"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm320-280L160-640v400h640v-400zm0-80 320-200H160zM160-640v-80 480z"/></svg>
         </button>メールで送る</a>
                  </li>
                </ul>
      </section>
    </article>
  `;

  const printBtn = document.querySelector(".recipe-actions-btn");

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      const originalTitle = document.title;

      // ファイル名に使えない文字を除去
      const safeTitle = recipe.title.replace(/[\\/:*?"<>|]/g, "");

      document.title = safeTitle;
      window.print();

      // Safari対策で少し待つ
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    });
  }
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

// ランダムレシピ表示
function renderRelatedRecipes(allRecipes, currentRecipeId) {
  const related = allRecipes.filter((r) => r.id !== currentRecipeId);

  const shuffled = [...related].sort(() => 0.5 - Math.random()).slice(0, 4);

  const container = document.getElementById("related");

  container.innerHTML = shuffled
    .map(
      (r) => `
    <a href="recipe.html?id=${r.id}" class="related-card">
           <img
          src= "${r.image.src}"
          srcset= "${r.image.srcset}"
          alt= "${r.image.image_alt}"
          sizes="(min-width: 375px) 23vw, 300px"
          loading="lazy" />
      <p>${r.title}</p>
    </a>
  `,
    )
    .join("");
}
renderRelatedRecipes(recipes, recipe.id);
