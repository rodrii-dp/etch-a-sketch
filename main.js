const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
let cells;

function createGrid(x) {
    for (let i = 0; i < x; i++) {
        const row = document.createElement("div");
        row.classList.add("grid-row");
        for (let j = 0; j < x; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.border = "1px solid black";
            gridItem.style.width = `${400 / x}px`;
            gridItem.style.height = `${400 / x}px`;

            row.appendChild(gridItem);
        }
        grid.appendChild(row);
    }
  
    cells = document.querySelectorAll(".grid-item");
}

createGrid(16);

function deleteGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function generateRandomColor() {
    const color = [];
    for (let i = 0; i < 3; i++) {
        const random_number = Math.floor(Math.random() * 255);
        color.push(random_number);
    }

    return color;
}

let draw = false;
const paintingButton = document.querySelector(".toggle-painting");

function paintCell() {
    cells.forEach(cell => {
        cell.addEventListener("mouseenter", () => {
            if (draw) {
                const randomColor = generateRandomColor();
                cell.style.backgroundColor = `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`;
            }
        })
    });
}

paintingButton.addEventListener("click", () => {
    draw = !draw;
    if (draw) {
      paintingButton.style.background = "linear-gradient(to bottom, #ffdbac, #ffcc99)";
    }
    else {
      paintingButton.style.background = "#f5e9c9";
    };
});

paintCell();

let erase = false;
const eraseButton = document.querySelector(".erase");

function eraseCellBackground() {
    cells.forEach(cell => {
        cell.addEventListener("mouseenter", () => {
            if (erase) cell.style.backgroundColor = "";
        });
    });
}

eraseButton.addEventListener("click", () => {
    erase = !erase;
    if (erase) {
      eraseButton.style.background = "linear-gradient(to bottom, #ffdbac, #ffcc99)";
    }
    else {
      eraseButton.style.background = "#f5e9c9";
    };
});

eraseCellBackground();

let showBorders = true;
bordersButton = document.querySelector(".show-borders");

function cellBorders() {
    cells.forEach(cell => {
        document.addEventListener("click", () => {
            if (showBorders) {
                cell.style.border = "1px solid black";
            } else {
                cell.style.border = "";
            }
        });
    });
}

bordersButton.addEventListener("click", () => {
    showBorders = !showBorders;
    if (!showBorders) {
      bordersButton.style.background = "linear-gradient(to bottom, #ffdbac, #ffcc99)";
    } else {
      bordersButton.style.background = "#f5e9c9";
    }
});

cellBorders();

function buttonInitialState() {
  draw = false;
  paintingButton.style.background = "#f5e9c9";

  erase = false;
  eraseButton.style.background = "#f5e9c9";
  
  showBorders = true;
  bordersButton.style.background = "#f5e9c9";
}

const span = document.querySelector("span");

slider.addEventListener("change", () => {
  deleteGrid();
  createGrid(slider.value);
  span.textContent = slider.value;

  paintCell();
  eraseCellBackground();
  cellBorders();

  buttonInitialState();
});
