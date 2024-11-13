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
    .attr("height", margin / 2 + leftColumnHeight * heightPercentage/2)
    
xraychooser.append("rect")
    .attr("x", 2 * (margin + width) -  2)
    .attr("y", 10)
    .attr("width", width)
    .attr("height", height / 2)
    .attr("rx", radius)
    .attr("ry", radius)
    .style("fill", "#3edffd")
    .style("stroke", "#16afeb")
    .style("stroke-width", 3);

xraychooser.append("text")
    .attr("x", 2 * (margin + width) + width / 2)
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

const thumbnail1 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
	.style("background-color", "#ccc");

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
    	confusion.selectAll(".dynamic-image").remove();
        confusion.selectAll(".dynamic-element").remove();
    	d3.selectAll(".thumbnail").classed("thumbnail-border", false);
        d3.select(this).classed("thumbnail-border", true);
		
		const thumbnail = d3.select(this);
        const image = thumbnail.select("image").node();
		const width = +image.getAttribute("width");
		const height = +image.getAttribute("height");	
	
		confusion
			.attr("viewBox", `0 0 ${width} ${height}`)
			.attr("width", width)
			.attr("height", height);
		
		if (image) {
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
			thumbnail.selectAll("*").each(function() {
				const element = this.cloneNode(true);
				d3.select(element).classed("dynamic-element", true);
				confusion.node().appendChild(element);
			});
		}
    });
    
    
// Placeholder for additional D3.js code
console.log("D3.js script loaded and ready for development");
