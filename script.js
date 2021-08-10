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
            this.style.backgroundColor = randomColor();
            break;
        case mode.erase:
            this.classList.add("erase");
            this.style.backgroundColor = "#FFFFFF";
            break;
    }
}

function randomColor(){
    return "#"+Math.floor(Math.random()*16777215).toString(16);
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
            colorTitle(false);
            break;
        case "rainbow":
            buttons.forEach(button => button.classList.remove("selected"))
            currentMode = mode.rainbow;
            this.classList.add("selected");
            colorPicker.setAttribute("disabled", "true");
            colorPicker.type = "";
            tempColorValue = colorPicker.value;
            colorPicker.value = "";
            colorTitle(true);
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

//fancy title decoration
const titleContainer = document.querySelector(".title");
let letterDict = {"E":[2,1,0,4,8,9,10,12,16,17,18], "T":[0,1,2,5,9,13,17], "C":[6,2,1,0,4,8,12,16,17,18,14], "H":[0,4,8,12,16,2,6,9,10,14,18,9], "A":[16,12,8,4,0,1,2,6,10,14,18,9], "S":[2,1,0,4,8,9,10,14,18,17,16], "K":[0,4,8,12,16,6,9,14,18], "-":[9,10]}
let titleArray = "ETCH-A-SKETCH".split("");
titleContainer.setAttribute("style", `grid-template-columns:repeat(${titleArray.length}, 1fr)`);

titleArray.forEach(generateTitleLetters);

function generateTitleLetters(letter){
    const letterBox = document.createElement("div");
    letterBox.classList.add("letterBox");
    letterBox.setAttribute("style", `display:grid;grid-template-columns:repeat(4, 1fr);grid-template-rows:repeat(5,1fr);`);
    titleContainer.append(letterBox);
    for(let i = 0; i<19; i++){
        const letterGrid = document.createElement("div");
        letterDict[letter].includes(i) ? setTimeout(function(){colorAfterDelay(letterGrid)}, (letterDict[letter].indexOf(i)*800)/(letterDict[letter].length)) : letterGrid.style.backgroundColor = "white";
        letterGrid.style.width = "10px";
        letterGrid.style.height = "10px";
        letterBox.appendChild(letterGrid);
    }
}

function colorAfterDelay(letterGrid){
    letterGrid.style.backgroundColor = "black";
}

function colorTitle(isModeRainbow){
    for (let i = 0; i < titleContainer.childElementCount; i++) {
        letterDict[titleArray[i]].forEach( function(child){
        if(isModeRainbow)
        {
            Math.random() < 0.25 ? titleContainer.childNodes[i].childNodes[child].style.backgroundColor = randomColor() : titleContainer.childNodes[i].childNodes[child].style.backgroundColor = "black";
        }
        else
        {
                titleContainer.childNodes[i].childNodes[child].style.backgroundColor = "black";
        }
        }
        )
    }
}