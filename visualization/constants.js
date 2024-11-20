const leftColumn = d3.select("#left-column");
const leftColumnWidth = document.querySelector(".left").offsetWidth;
const leftColumnHeight = document.querySelector(".left").offsetHeight;

const middleColumn = d3.select("#middle-column");
const middleColumnWidth = document.querySelector(".middle").offsetWidth;
const middleColumnHeight = document.querySelector(".middle").offsetHeight;

const rightColumn = d3.select("#right-column");
const rightColumnWidth = document.querySelector(".right").offsetWidth;
const rightColumnHeight = document.querySelector(".right").offsetHeight;

const confusionWidth = rightColumnWidth; 
const confusionHeight = rightColumnHeight / 2;

const widthPercentage = 0.30;
const heightPercentage = 0.075;
const radiusPercentage = 0.25;

const containerWidth = leftColumn.node().clientWidth;
const containerHeight = leftColumn.node().clientHeight;

const width = containerWidth * widthPercentage;
const height = containerHeight * heightPercentage;
const radius = height * radiusPercentage;
const margin = (containerWidth - 3 * width) / 2


const correctColorScale = ["#a1eafb", "#6bd4cb", "#32bea6", "#00897b"]; // Greens
const incorrectColorScale = ["#ffb3b3", "#ff6666", "#ff1a1a", "#cc0000"]; // Reds

let currentXRay;
let currentXRayLabel;