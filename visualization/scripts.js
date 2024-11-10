// Example D3.js script setup

// Select the middle column and append an SVG element as a placeholder
const leftColumn = d3.select("#left-column");
const leftColumnWidth = document.querySelector(".left").offsetWidth;
const leftColumnHeight = document.querySelector(".left").offsetHeight;

const middleColumn = d3.select("#middle-column");
const middleColumnWidth = document.querySelector(".middle").offsetWidth;
const middleColumnHeight = document.querySelector(".middle").offsetHeight;

const rightColumn = d3.select("#right-column");
const rightColumnWidth = document.querySelector(".right").offsetWidth;
const rightColumnHeight = document.querySelector(".right").offsetHeight;



const xraybuttons = leftColumn.select("#button-container")
    .append("svg")
    .attr("width", leftColumnWidth)
    .attr("height", leftColumnHeight/2);


const widthPercentage = 0.30;
const heightPercentage = 0.2;
const radiusPercentage = 0.25;

const containerWidth = xraybuttons.node().clientWidth;
const containerHeight = xraybuttons.node().clientHeight;

const width = containerWidth * widthPercentage;
const height = containerHeight * heightPercentage;
const radius = height * radiusPercentage;
const margin = (containerWidth - 3 * width) / 2


xraybuttons.append("path")
    .attr("d", `
        M ${margin + 2 * width}, 5 
        h ${width - radius} 
        a ${radius},${radius} 0 0 1 ${radius},${radius} 
        a ${radius},${radius} 0 0 1 -${radius},${radius} 
        h -${width - radius}
        z
    `)
    .style("fill", "#69b3a2")
    .style("stroke", "#333")
    .style("stroke-width", 2);

xraybuttons.append("rect")
	.attr("x", margin + width)
    .attr("y", 5)
    .attr("width", width)
    .attr("height", height/2)
    .style("fill", "#69b3a2")
    .style("stroke", "#333")
    .style("stroke-width", 2);

xraybuttons.append("path")
    .attr("d", `
        M ${margin + width}, 5
        h -${width - radius} 
        a ${radius},${radius} 0 0 0 -${radius},${radius} 
        a ${radius},${radius} 0 0 0 ${radius},${radius} 
        h ${width - radius}
        z
    `)
    .style("fill", "#69b3a2")
    .style("stroke", "#333")
    .style("stroke-width", 2);

    
    
const confusion = d3.select("#confusion")
    .attr("viewBox", "0 0 400 200")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("background-color", "#ccc")
    .attr("width", "100%")
    .attr("height", "50%");

const tnContainer = rightColumn.append("div").classed("thumbnail-container", true);

const thumbnail1 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200");

const thumbnail2 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200");


const thumbnail3 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200");

const thumbnail4 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200");
    
    
// Placeholder for additional D3.js code
console.log("D3.js script loaded and ready for development");
