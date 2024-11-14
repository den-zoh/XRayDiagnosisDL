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





const xraybuttons = leftColumn.select("#button-container")
    .append("svg")
    .attr("width", leftColumnWidth)
    .attr("height", leftColumnHeight * heightPercentage)

xraybuttons.append("path")
    .attr("d", `
        M ${margin + 2 * width}, 5 
        h ${width - radius} 
        a ${radius},${radius} 0 0 1 ${radius},${radius} 
        a ${radius},${radius} 0 0 1 -${radius},${radius} 
        h -${width - radius}
        z
    `)
    .style("fill", "#3edffd")
    .style("stroke", "#16afeb")
    .style("stroke-width", 3);

xraybuttons.append("text")
    .attr("x", 2 * (margin + width) + width / 4 + margin / 2)
    .attr("y", 5 + height / 4)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text("Segmentation")
    .style("fill", "#064f8d")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold");

xraybuttons.append("rect")
	.attr("x", margin + width)
    .attr("y", 5)
    .attr("width", width)
    .attr("height", height/2)
    .style("fill", "#3edffd")
    .style("stroke", "#16afeb")
    .style("stroke-width", 3);

xraybuttons.append("text")
    .attr("x", (margin + width) + width / 2)
    .attr("y", 5 + height / 4)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text("Heat Map")
    .style("fill", "#064f8d")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold");

xraybuttons.append("path")
    .attr("d", `
        M ${margin + width}, 5
        h -${width - radius} 
        a ${radius},${radius} 0 0 0 -${radius},${radius} 
        a ${radius},${radius} 0 0 0 ${radius},${radius} 
        h ${width - radius}
        z
    `)
    .style("fill", "#3edffd")
    .style("stroke", "#16afeb")
    .style("stroke-width", 3);

xraybuttons.append("text")
    .attr("x", margin + width / 2)
    .attr("y", 5 + height / 4)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text("XRay")
    .style("fill", "#064f8d")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold");


const chooser = d3.select("#xray-chooser-container")
    .attr("width", "100%")
    .attr("height", "20%");

const fileList = [
    { name: "File 1", thumbnail: "images/thumbnail1.png" },
    { name: "File 2", thumbnail: "images/thumbnail2.png" },
    { name: "File 3", thumbnail: "images/thumbnail3.png" },
    { name: "File 4", thumbnail: "images/thumbnail4.png" },
    { name: "File 5", thumbnail: "images/thumbnail5.png" },
    { name: "File 6", thumbnail: "images/thumbnail6.png" },
    { name: "File 7", thumbnail: "images/thumbnail7.png" },
];

const chooserList = document.querySelector("#xray-chooser-list");
chooserList.style.display = "grid";
chooserList.style.gridTemplateColumns = "repeat(3, 1fr)";
chooserList.style.gap = "10px";

fileList.forEach(file => {
    const fileItem = document.createElement("div");
	fileItem.style.display = "flex";
	fileItem.style.flexDirection = "column";
	fileItem.style.alignItems = "center";
	fileItem.style.backgroundColor = "white";
	fileItem.style.border = "1px solid #ccc";
	fileItem.style.padding = "10px";
	fileItem.style.borderRadius = "4px";

    const fileImage = document.createElement("img");
    fileImage.src = file.thumbnail;
    fileImage.alt = file.name;
    fileImage.style.width = "100px";
    fileImage.style.height = "100px";

    const fileName = document.createElement("span");
    fileName.textContent = file.name;
    fileName.style.marginTop = "10px";
    fileName.style.textAlign = "center";

    fileItem.appendChild(fileImage);
    fileItem.appendChild(fileName);

    chooserList.appendChild(fileItem);
});



const xraychooser = leftColumn.select("#xray-chooser-button-container")
    .append("svg")
    .attr("width", leftColumnWidth)
    .attr("height", margin + leftColumnHeight * heightPercentage/2)
    
xraychooser.append("path")
    .attr("d", `
        M ${margin + 2 * width}, 10 
        h ${width - radius} 
        a ${radius},${radius} 0 0 1 ${radius},${radius} 
        a ${radius},${radius} 0 0 1 -${radius},${radius} 
        h -${width - radius}
        z
    `)
    .style("fill", "#3edffd")
    .style("stroke", "#16afeb")
    .style("stroke-width", 3);
    
xraychooser.append("text")
    .attr("x", 2 * (margin + width) + (margin + width) / 4 + margin/4)
    .attr("y", height / 4 + 10)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text("Use Sample XRay")
    .style("fill", "#064f8d")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold");
    
xraychooser.append("path")
    .attr("d", `
        M ${margin + 2 * width}, 10
        h -${width - radius} 
        a ${radius},${radius} 0 0 0 -${radius},${radius} 
        a ${radius},${radius} 0 0 0 ${radius},${radius} 
        h ${width - radius}
        z
    `)
    .style("fill", "#0e8cd2")
    .style("stroke", "#044bb2")
    .style("stroke-width", 3); 

xraychooser.append("text")
    .attr("x", margin + width + width / 2)
    .attr("y", height / 4 + 10)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text("Upload XRay...")
    .style("fill", "#064f8d")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold"); 
    
    
const confusion = d3.select("#confusion")
    .attr("viewBox", "0 0 785 624")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("width", "100%")
    .attr("height", "50%");

const tnContainer = rightColumn.append("div").classed("thumbnail-container", true);

function drawEpochLineChart(svg, data, width, height, fontSize) {
	const margin = { 
    	top: height * 0.1, 
    	right: width * 0.025, 
    	bottom: height * 0.225, 
    	left: width * 0.125
    };
    const tickSize = fontSize === "small" ? "10pt" : "20pt";
    const labelsSize = fontSize === "small" ? "14pt" : "30pt";
    const titleSize = fontSize === "small" ? "16pt" : "36pt";
    const yoffset = fontSize === "small" ? 3* margin.bottom/4 :  margin.bottom/2 - 7;

    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.epoch))
        .range([0, chartWidth]);

    const yScale = d3.scaleLog()
        .domain([d3.max(data, d => d.loss), d3.min(data, d => d.loss)])
        .range([0, chartHeight]);

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(5, ".1");

    chart.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", tickSize)
        .style("fill", "#000");

    chart.append("g")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", tickSize)
        .style("fill", "#000");
    
    chart.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + yoffset)
        .attr("text-anchor", "middle")
        .style("font-size", labelsSize)
        .style("fill", "#042d7f")
        .text("Epoch");
    
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -100)
        .attr("text-anchor", "middle")
        .style("font-size", labelsSize)
        .style("fill", "#042d7f")
        .text("Loss");
        
    chart.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", titleSize)
        .style("font-weight", "bold")
        .style("fill", "#042d7f")
        .text("Epochs vs Training Loss");    

    const line = d3.line()
        .x(d => xScale(d.epoch))
        .y(d => yScale(d.loss));

    chart.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#042d7f")
        .attr("stroke-width", 3)
        .attr("d", line);

    chart.selectAll(".point")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.epoch))
        .attr("cy", d => yScale(d.loss))
        .attr("r", 5)
        .attr("fill", "#042d7f");
        
}

const thumbnail1 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
    .attr("data-function", "drawEpochLineChart")
	.style("background-color", "#bef4fd");

const data = [
	{ epoch: 1, loss: 0.3786 },
	{ epoch: 2, loss: 0.1408 },
	{ epoch: 3, loss: 0.0983 },
	{ epoch: 4, loss: 0.0543 },
	{ epoch: 5, loss: 0.0349 },
	{ epoch: 6, loss: 0.0174 },
	{ epoch: 7, loss: 0.0113 },
	{ epoch: 8, loss: 0.0027 },
	{ epoch: 9, loss: 0.0008 },
	{ epoch: 10, loss: 0.0002 }
];

drawEpochLineChart(thumbnail1, data, 400, 200, "small");


// drawEpochLineChart("#zoomed-container", data, 600, 400);

const thumbnail2 = tnContainer.append("svg")
	.attr("id", "Confusion Matrix")
    .classed("thumbnail", true)
    .classed("thumbnail-border", true)
    .attr("viewBox", "0 0 400 200")
    .append("image")
    .attr("href", "images/confusion_matrix.png")
    .attr("x", 2 * (785 - 200)/3)
    .attr("y", 0)
    .attr("width", 785)
    .attr("height", 624)
    .style("transform", `scale(${200 / 785}, ${200 / 624})`);
    
const thumbnail3 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
	.style("background-color", "#ccc");

const thumbnail4 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
	.style("background-color", "#ccc");

d3.selectAll(".thumbnail")
    .on("click", function() {
    	// confusion.selectAll(".dynamic-image").remove();
//         confusion.selectAll(".dynamic-element").remove();
		confusion.selectAll("*").remove();
    	d3.selectAll(".thumbnail").classed("thumbnail-border", false);
        d3.select(this).classed("thumbnail-border", true);
		
		const thumbnail = d3.select(this);
        const image = thumbnail.select("image").node();
		
		if (image) {
			const width = +image.getAttribute("width");
			const height = +image.getAttribute("height");	
		
			confusion
				.attr("viewBox", `0 0 ${width} ${height}`)
				.attr("width", width)
				.attr("height", height);
			const clonedImage = image.cloneNode(true);
			d3.select(clonedImage).classed("dynamic-image", true);
			confusion.node().appendChild(clonedImage);
			
			d3.select(clonedImage)
				.classed("dynamic-image", true)
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", width)
				.attr("height", height)
				.style("transform", "none");			
		} else {
			confusion
				.attr("class", "dynamic-element")
        		.style("background-color", "#bef4fd99")
			const chartType = thumbnail.attr("data-function");
			if (chartType === "drawEpochLineChart") {
				drawEpochLineChart(confusion, data, 800, 700, "large");
			}
			// thumbnail.selectAll("*").each(function() {
// 				const element = this.cloneNode(true);
// 				d3.select(element).classed("dynamic-element", true);
// 				confusion.node().appendChild(element);
// 			});
		}
    });
    
    
// Placeholder for additional D3.js code
console.log("D3.js script loaded and ready for development");
