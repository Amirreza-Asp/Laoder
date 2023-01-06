var loader = document.querySelector(".loader");
var loaderCircleLines = document.querySelectorAll(".loader-circle-lines");
var loaderPercent = document.querySelector(".loader-percent");
var loaderContent = document.querySelector(".loader-content");
var color;

window.addEventListener("DOMContentLoaded", function () {
  AddLoaderCircleWidth();
  SetColor();
  AddLoaderCircleLines(35);
  Load();
  ChangePercentStyles();
});

function SetColor() {
  color = loader.getAttribute("data-color");
  loader.style.color = color;
}

function ChangePercentStyles() {
  let width = loader.getAttribute("data-width");
  loaderPercent.setAttribute("style", `font-size:calc(${width} / 5);`);
  loaderContent.setAttribute("style", `font-size:calc(${width} / 13);`);
}

function AddLoaderCircleWidth() {
  let width = loader.getAttribute("data-width");
  loader.style.width = width;
}

function AddLoaderCircleLines(count) {
  for (let i = 0; i < count; i++) {
    let div = document.createElement("div");
    div.setAttribute("style", `transform:rotate(${i * (360 / count)}deg);`);
    div.className = "loader-circle-lines";
    loader.appendChild(div);
  }

  loaderCircleLines = document.querySelectorAll(".loader-circle-lines");
}

function Load() {
  let loadingPercent = 100 / loaderCircleLines.length;
  let speed = loader.getAttribute("data-speed");
  let count = 0;

  setInterval(() => {
    loaderCircleLines.forEach((line, index) => {
      ChangePercent(Math.round(count * loadingPercent));

      if (index <= count) addColor(line);
      else removeColor(line);

      if (count > loaderCircleLines.length) {
        count = 0;
      }
    });

    count++;
  }, speed);
}

function addColor(line) {
  line.style.background = `linear-gradient(transparent 92%, ${color} 92%)`;
}

function removeColor(line) {
  line.style.background = "transparent";
}

function ChangePercent(num) {
  loaderPercent.innerHTML = `<span class="loader-percent-num">${num}</span><span class="loader-percent-icon">%</span>`;
}
