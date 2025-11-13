// Lightbox 機能しぇ！
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.getElementById("lightbox-close");

// 今表示している画像が、何番目かを追跡する
// 現状
// const images = Array.from(document.querySelectorAll(".gallery__img"));

const images = Array.from(document.querySelectorAll(".gallery__img")).map(
  (img) => ({
    fullWebp: img.dataset.fullWebp,
    fullAvif: img.dataset.fullAvif,
    caption: img.dataset.caption || "",
  })
);

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".gallery__img").forEach((img, index) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.dataset.fullWebp;
      lightboxCaption.textContent = img.dataset.caption || "";
      currentIndex = index; // ← 現在の画像番号を保存
      updateLightboxImage();
      lightbox.classList.remove("hidden");
    });
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

// 2. Esc キーで閉じる処理
document.addEventListener("keydown", function (e) {
  if (lightbox.classList.contains("hidden")) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  } else if (e.key === "Escape") {
    closeLightbox();
  }
  // if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
  //   closeLightbox();
  // }
});

// 3. Lightbox 背景をクリックで閉じる
lightbox.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("lightbox__backdrop") ||
    e.target === lightbox
  ) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  // 必要なら画像やキャプションもクリア
  lightboxImg.src = "";
}

// 矢印クリックで画像を切り替え
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxImage();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxImage();
});

// 拡大率変更ボタン
const toggleFitBtn = document.getElementById("toggle-fit");
const element = document.getElementById("message");

toggleFitBtn.addEventListener("click", () => {
  const isCover =
    lightboxImg.style.objectFit === "cover" || !lightboxImg.style.objectFit;
  lightboxImg.style.objectFit = isCover ? "contain" : "cover";
  element.innerText = isCover ? "zoom_out" : "zoom_in";
});

function updateLightboxImage() {
  const { fullWebp, caption } = images[currentIndex];
  lightboxImg.src = fullWebp;
  lightboxCaption.textContent = caption;
}

// function updateLightboxImage() {
//   lightboxImg.classList.add("fade-out");

//   setTimeout(() => {
//     lightboxImg.src = images[currentIndex].src;
//     lightboxCaption.textContent = images[currentIndex].dataset.caption || "";

//     lightboxImg.classList.remove("fade-out");
//     lightboxImg.classList.add("fade-in");

//     setTimeout(() => {
//       lightboxImg.classList.remove("fade-in");
//     }, 500);
//   }, 500);
// }
console.log("✅ gallery.js loaded");
