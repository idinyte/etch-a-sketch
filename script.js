const mode = {"color":0, "rainbow":1, "erase":2};
let currentMode = mode.color;
const container = document.querySelector(".grid-container");
const sliderText = document.querySelector("#slider-value");
const gridSlider = document.querySelector("#grid-size-slider");
let gridSize = gridSlider.value;
createGrid();
gridSlider.addEventListener("input", updateSliderText);
gridSlider.addEventListener("change", createGrid);
let tempColorValue;

//grid coloring
function setColor(){
    switch (currentMode){
        case mode.color:
            this.classList.remove("erase");
            this.style.backgroundColor = document.querySelector("#color-picker").value; 
            break;
        case mode.rainbow:
            this.classList.remove("erase");
            this.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16);
            break;
        case mode.erase:
            this.classList.add("erase");
            this.style.backgroundColor = "#FFFFFF";
            break;
    }
}

//creating grid
function updateSliderText(){
    sliderText.textContent = `${gridSlider.value} x ${gridSlider.value}`;
}

function createGrid(){
    let gridSize = gridSlider.value;
    sliderText.textContent = `${gridSize} x ${gridSize}`;
    container.childNodes.forEach(child => child.style.backgroundColor = "white");
    container.setAttribute("style", `grid-template-columns:repeat(${gridSize}, 1fr);grid-template-rows:repeat(${gridSize},1fr);`);
    let missingChildren = gridSize**2-container.childElementCount;
    if(missingChildren == 0) return;
    missingChildren > 0 ? addChildren(missingChildren) : removeChildren(missingChildren);
    for(let i = 0; i<16**2; i++){
        const square = document.createElement("div");
        square.style.backgroundColor = "white";
        square.addEventListener("mouseenter", setColor);
        container.appendChild(square);
    }
}

function addChildren(childCount){
    for(let i = 0; i<childCount; i++){
        const square = document.createElement("div");
        square.style.backgroundColor = "white";
        square.addEventListener("mouseenter", setColor);
        container.appendChild(square);
    }
}

function removeChildren(childCount){
    for(let i = 0; i<childCount; i++){
        container.removeChild(container.firstChild);
    }
}


//UI buttons
function onButtonPress(){
    let id = this.id;
    switch (id){
        case "color":
            buttons.forEach(button => button.classList.remove("selected"))
            currentMode= mode.color;
            this.classList.add("selected");
            colorPicker.type = "color";
            colorPicker.value = colorPicker.value;
            colorPicker.removeAttribute("disabled");
            break;
        case "rainbow":
            buttons.forEach(button => button.classList.remove("selected"))
            currentMode = mode.rainbow;
            this.classList.add("selected");
            colorPicker.setAttribute("disabled", "true");
            colorPicker.type = "";
            tempColorValue = colorPicker.value;
            colorPicker.value = "";
            break;
        case "erase":
            buttons.forEach(button => button.classList.remove("selected"))
            currentMode = mode.erase;
            this.classList.add("selected");
            break;
        case "clear":
            container.childNodes.forEach(child => child.style.backgroundColor = "white");
            break;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener("click", onButtonPress))

const colorPicker = document.querySelector("#color-picker");
