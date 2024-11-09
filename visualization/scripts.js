// Example D3.js script setup

// Select the middle column and append an SVG element as a placeholder
const leftColumn = d3.select("#left-column");
const middleColumn = d3.select("#middle-column");
const rightColumn = d3.select("#right-column");

const confusion = d3.select("#confusion")
    .attr("viewBox", "0 0 400 200")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("background-color", "#ccc")
    .attr("width", "100%")
    .attr("height", "100%");

    
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
