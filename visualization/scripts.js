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
    .style("fill", "#0e8cd2")
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
    .style("fill", "#0e8cd2")
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

const rangeData = [
			{ label: "PNEUMONIA", low: 3418, high:4272 },
			{ label: "NORMAL", low: 1266, high:1582 },
			{ label: "COVID19", low: 460, high:575 }
];

const samples = [
    552, 1266, 1451, 520, 1308, 561, 4062, 
    3497, 3904, 3451, 490, 1462
];

let fileList = [];
let actLabel = ""
const defaultIndex = 0
for (const sample of samples) {
    for (const range of rangeData) {
        if (sample >= range.low && sample <= range.high) {
            actLabel = range.label;
            break;
        }
    }
    temp = { sampleID: `${sample}`, actlabel: `${actLabel}`, name: `Sample ${sample}`, thumbnail: `images/Data_400x300/test/${actLabel}/${actLabel}(${sample})_400x300.jpg` },
    fileList.push(temp)
}

const chooserList = document.querySelector("#xray-chooser-list");
chooserList.style.display = "grid";
chooserList.style.gridTemplateColumns = "repeat(3, 1fr)";
chooserList.style.gap = "10px";

fileList.forEach((file,index) => {
    const fileItem = document.createElement("div");
    fileItem.style.display = "flex";
    fileItem.style.flexDirection = "column";
    fileItem.style.alignItems = "center";
    fileItem.style.backgroundColor = "#bef4fd";
    if (index == defaultIndex) 
    	{fileItem.style.border = "3px solid #3edffd";}
    else {fileItem.style.border = "1px solid #042d7f";}
    fileItem.style.padding = "10px";
    fileItem.style.borderRadius = "4px";
    fileItem.style.cursor = "pointer"; 

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

    // onclick event
    fileItem.onclick = () => {
        const clickedIndex = Array.from(chooserList.children).indexOf(fileItem);

        const tiles = document.querySelectorAll("#xray-chooser-list > div");
        tiles.forEach(tile => {
            tile.style.border = "1px solid #042d7f"; 
        });

        fileItem.style.border = "3px solid #3edffd";
        const resultsContainer = middleColumn.select("#results-container");
		resultsContainer.html("");
        DrawAugments(resultsContainer, xrayID=samples[clickedIndex]);
        
        const xrayImage = document.getElementById("xray-image");
		xrayImage.src = fileList[clickedIndex].thumbnail;
    };

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

// Middle Column

// const correctColorScale = ["#2e8b57", "#228b22", "#006400", "#013220"];
// const incorrectColorScale = ["#f8d7da", "#f08080", "#dc143c", "#8b0000"];
// const correctColorScale = ["#a8d18d", "#85c07f", "#68a957", "#527d39"];
// const incorrectColorScale = ["#f8d7da", "#f08080", "#dc143c", "#8b0000"];
const correctColorScale = ["#a1eafb", "#6bd4cb", "#32bea6", "#00897b"]; // Greens
const incorrectColorScale = ["#ffb3b3", "#ff6666", "#ff1a1a", "#cc0000"]; // Reds
function formatLabel(label) {
    if (label === "COVID19") return label;
    return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
}

function getColorAndPredictionLabel(predToGet = "original", XRayID = 552, actualLabel) {
    const defaultResult = { color: "#042d7f", label: "Prediction" };

    if (!predData[XRayID]) {
        return defaultResult;
    }

    const predictionData = predData[XRayID];
    const predictions = predictionData.predictions;

    const selectedPrediction = predToGet === "original" 
        ? predictions.original 
        : predictions.augmentation[predToGet];

    if (!selectedPrediction) {
        return defaultResult;
    }

    const predictedLabel = selectedPrediction.prediction;
    const probabilities = selectedPrediction.probabilities;
    const predictedProbability = probabilities[predictedLabel];
    const isCorrect = predictedLabel === actualLabel;
    const colorScale = isCorrect ? correctColorScale : incorrectColorScale;

    let color;
    if (predictedProbability >= 0.75) {
        color = colorScale[3];
    } else if (predictedProbability >= 0.5) {
        color = colorScale[2];
    } else if (predictedProbability >= 0.25) {
        color = colorScale[1];
    } else {
        color = colorScale[0];
    }
    
    const percentage = (predictedProbability * 100).toFixed(0);
    const label = `${formatLabel(predictedLabel)} ${percentage}%`;

    return { color , label };
}


function DrawAugments(resultsCont, xrayID) {
	let bmargin = "45px";
	
	for (const range of rangeData) {
        if (xrayID >= range.low && xrayID <= range.high) {
            xrayActual = range.label;
            break;
        }
    }
    
    const thumbnails = [
        { id: "#xraythumb3", label: "Brightness x 1.2", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrayID})_200x150_augbr.jpg` },
        { id: "#xraythumb4", label: "Contrast x 1.1", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrayID})_200x150_augct.jpg` },
        { id: "#xraythumb5", label: "Blur x 0.0", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrayID})_200x150_augbl.jpg` },
        { id: "#xraythumb6", label: "Sharpen x 2.0", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrayID})_200x150_augsh.jpg` }
    ];

    let thumbnailContainer = resultsCont.append("div")
			.classed("xray-thumbnail-container", true);
	
	thumbnailContainer.selectAll("img").remove();
    
	img1 = `./images/Data_200x150/test/${xrayActual}/${xrayActual}(${xrayID})_200x150.jpg`
	
	const resHFlip = getColorAndPredictionLabel("horizontal_flip", xrayID, xrayActual);
	const res5deg = getColorAndPredictionLabel("5_degree_rotation", xrayID, xrayActual);

	thumbnailContainer.append("p")
		.text(resHFlip.label)
		.classed("prediction", true)
		.attr("xrayActual", xrayActual)
		.attr("xrayID", xrayID)
		.style("text-align", "center")
		.style("font-size", "16pt")
		.style("color", resHFlip.color)
		.style("font-weight", "bold")
// 		.style("background-color", "#bef4fd66")
		.style("display", "none")
		.attr("transform", "scale(-1, 1) translate(-160, 0)");

	thumbnailContainer.append("img")
		.attr("src", img1) 
		.attr("width", 160)
		.attr("height", 120)
		.attr("id", "xraythumb1")
		.classed("xray-thumbnail", true)
		.style("transform", "scaleX(-1)")
		.style("transform-origin", "center");
    
    thumbnailContainer.append("p")
		.text("Horizontal Flip")
		.style("text-align", "center")
		.style("font-size", "10pt")
		.style("color", "#042d7f")
		.style("font-weight", "bold")
		.style("background-color", "#bef4fd99")
		.style("margin-bottom", bmargin)
		.attr("transform", "scale(-1, 1) translate(-160, 0)");
    
    let thumbnailContainer2 = resultsCont.append("div")
			.classed("xray-thumbnail-container", true);
	
	thumbnailContainer2.append("p")
		.text(res5deg.label)
		.classed("prediction", true)
		.attr("xrayActual", xrayActual)
		.attr("xrayID", xrayID)
		.style("text-align", "center")
		.style("font-size", "16pt")
		.style("color", res5deg.color)
		.style("font-weight", "bold")
		.style("display", "none");
		
	thumbnailContainer2.append("img")
		.attr("src", img1) 
		.attr("width", 160)
		.attr("height", 120)
		.attr("id", "xraythumb2")
		.classed("xray-thumbnail", true)
		.style("transform", "rotate(5deg)")
        .style("transform-origin", "center");
    
    thumbnailContainer2.append("p")
		.html("Rotated 5 &deg; CW")
		.style("text-align", "center")
		.style("font-size", "10pt")
		.style("color", "#042d7f")
		.style("font-weight", "bold")
		.style("margin-bottom", bmargin)
		.style("background-color", "#bef4fd99");
	
	const resBlur = getColorAndPredictionLabel("increase_blur", xrayID, xrayActual);
	const resBright = getColorAndPredictionLabel("increase_brightness", xrayID, xrayActual);
	const resSharp = getColorAndPredictionLabel("increase_sharpness", xrayID, xrayActual);
	const resContr = getColorAndPredictionLabel("increase_contrast", xrayID, xrayActual);

	let plabel;
	let pcolor;
	thumbnails.forEach(({ id, label, img }) => {
		switch (id) {
			case "#xraythumb1":
				pcolor = resBright.color;
				plabel = resBright.label;
				break;
			case "#xraythumb2":
				pcolor = resSharp.color;
				plabel = resSharp.label;
				break;
			case "#xraythumb3":
				pcolor = resBlur.color;
				plabel = resBlur.label;
				break;
			default:
				pcolor = resContr.color;
				plabel = resContr.label;
				break;
		}
		const thumbnailContainer = resultsCont.append("div")
			.classed("xray-thumbnail-container", true);
		
		thumbnailContainer.append("p")
			.text(plabel)
			.classed("prediction", true)
			.attr("xrayActual", xrayActual)
			.attr("xrayID", xrayID)
			.style("text-align", "center")
			.style("font-size", "16pt")
			.style("color", pcolor)
			.style("font-weight", "bold")
			.style("display", "none");
// 			.style("background-color", "#bef4fd66");
			
		thumbnailContainer.append("img")
			.attr("src", img) 
			.attr("width", 160)
			.attr("height", 120)
			.attr("id", id)
			.classed("xray-thumbnail", true); 
	
		thumbnailContainer.append("p")
			.text(label)
			.style("text-align", "center")
			.style("font-size", "10pt")
			.style("color", "#042d7f")
			.style("font-weight", "bold")
			.style("margin-bottom", bmargin)
			.style("background-color", "#bef4fd99");
	});
	

}

function DrawMiddleButtons(){
	const mwidth = rescontainer.node().clientWidth * widthPercentage - 5;
	const mmargin = 0
	
	const resbuttons = middleColumn.append("div")
		.attr("id", "results-button-container")
		.style("margin-top", "3px")
		.append("svg")
		.attr("height", middleColumnHeight * heightPercentage)
		
	resbuttons.append("path")
		.attr("d", `
			M ${mmargin + 2 * mwidth}, 5 
			h ${mwidth - radius} 
			a ${radius},${radius} 0 0 1 ${radius},${radius} 
			a ${radius},${radius} 0 0 1 -${radius},${radius} 
			h -${mwidth - radius}
			z
		`)
		.style("fill", "#0e8cd2")
		.style("stroke", "#16afeb")
		.style("stroke-mwidth", 3);
	
	resbuttons.append("text")
		.attr("x", 2 * (mmargin + mwidth) + mwidth / 2 + mmargin / 2)
		.attr("y", 5 + height / 4)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Similar")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");
	
	const resultsButton = resbuttons.append("rect")
		.attr("x", mmargin + mwidth)
		.attr("y", 5)
		.attr("width", mwidth)
		.attr("height", height/2)
		.style("fill", "#3edffd")
		.style("stroke", "#16afeb")
		.style("stroke-mwidth", 3);
	
	const resultsLabel = resbuttons.append("text")
		.attr("x", (mmargin + mwidth) + mwidth / 2)
		.attr("y", 5 + height / 4)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Results")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");

	const augButton = resbuttons.append("path")
		.attr("d", `
			M ${mmargin + mwidth}, 5
			h -${mwidth - radius} 
			a ${radius},${radius} 0 0 0 -${radius},${radius} 
			a ${radius},${radius} 0 0 0 ${radius},${radius} 
			h ${mwidth - radius}
			z
		`)
		.style("fill", "#3edffd")
		.style("stroke", "#16afeb")
		.style("stroke-mwidth", 3);
	
	const augLabel = resbuttons.append("text")
		.attr("x", mmargin + mwidth / 2)
		.attr("y", 5 + height / 4)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Augments")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");
	
	resultsLabel.on("click", () => {
		toggleResults();
	});
	resultsButton.on("click", () => {
		toggleResults();
	});
	augButton.on("click", () => {	
		const predictions = rescontainer.selectAll(".prediction");
		predictions.each(function () {
			const currentDisplay = d3.select(this).style("display");
			d3.select(this).style("display", currentDisplay === "block" ? "none" : "block");
		});
	});

	augLabel.on("click", () => {
		console.log("Aug Button clicked");
	
		const predictions = rescontainer.selectAll(".prediction");
		predictions.each(function () {
			const currentDisplay = d3.select(this).style("display");
			d3.select(this).style("display", currentDisplay === "block" ? "none" : "block");
		});
	});

}

const rescontainer = middleColumn.append("div")
		.attr("id", "results-container")
		.classed("results-container", true)
		.style("margin-top", "25px");

DrawAugments(rescontainer, 552)
DrawMiddleButtons()

console.log(predData);
function toggleResults() {
//     console.log("toggleResults triggered");
// 
// 	console.log("Rescontainer:", rescontainer);
// 
// 	console.log("Rescontainer:", rescontainer);
// 	console.log(document.querySelectorAll(".prediction"));

	const predictions = rescontainer.selectAll(".prediction");
// 	console.log(`Number of predictions: ${predictions.size()}`);
// 	console.log(predictions.nodes());

	predictions.each(function (d, i) {
		const currentDisplay = d3.select(this).style("display");
		if (currentDisplay !== "none") {
			d3.select(this).style("display", "none");
			return;
		}
		const actualLabel = d3.select(this).attr("xrayActual");
		const XRayID = d3.select(this).attr("xrayID");
		d3.select(this).style("display", "block");
	});
}


// Right Column    
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
        .text("Training Loss");
        
    chart.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", titleSize)
        .style("font-weight", "bold")
        .style("fill", "#042d7f")
        .text("Epoch vs Training Loss");    

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

function drawTwoLevelPieChart(svg, data, width, height, fontSize) {
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
    const radius = Math.min(width, height) / 2;
	const outerColors = ["#0762ad", "#0492c9",]; 
	const innerColors = ["#0492c9", "#41b4e0", "#6bcdf3", "#0762ad", "#438fce", "#8ac5f7",]; 
	
	const outerColorScale = d3.scaleOrdinal()
		.domain(["Test", "Train"]) 
		.range(outerColors); 
	
	const innerColorScale = d3.scaleOrdinal()
		.domain(["COVID", "Pneumonia", "Normal",])
		.range(innerColors);

    const outerArc = d3.arc()
        .innerRadius(radius * 0.7)
        .outerRadius(radius);

    const innerArc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius * 0.67);

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const chartGroup = svg.append("g")
        .attr("transform", `translate(${width / 4 + margin.left / 2}, ${height / 2})`);

    // outer pie
    chartGroup.selectAll(".outer-slice")
        .data(pie(data.outer))
        .enter()
        .append("path")
        .attr("class", "outer-slice")
        .attr("d", outerArc)
        .attr("fill", (d, i) => outerColorScale(i))
        .style("stroke", "#bef4fd")
        .style("stroke-width", "2px");

    // inner pie
    chartGroup.selectAll(".inner-slice")
        .data(pie(data.inner))
        .enter()
        .append("path")
        .attr("class", "inner-slice")
        .attr("d", innerArc)
        .attr("fill", (d, i) => innerColorScale(i))
        .style("stroke", "#bef4fd")
        .style("stroke-width", "2px");

    // labels outer pie
    chartGroup.selectAll(".outer-label")
        .data(pie(data.outer))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${outerArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("fill", "#bef4fd")
        .style("font-size", tickSize)
        .text(d => d.data.label);
        
    chartGroup.selectAll(".inner-label")
		.data(pie(data.inner))
		.enter()
		.append("text")
		.attr("transform", d => {
			const angle = (d.startAngle + d.endAngle) / 2;
			const [x, y] = innerArc.centroid(d); 
			const scaleX = angle > Math.PI ? -1 : 1;
			const scaleY = angle > Math.PI ? -1 : 1;
      	  	return `translate(${x * 1.85}, ${y * 1.85}) rotate(${(angle * 180) / Math.PI - 90}) scale(${scaleX}, ${scaleY})`;
		})
		.attr("text-anchor", d => {
			const angle = (d.startAngle + d.endAngle) / 2;
			return angle > Math.PI ? "start" : "end";
		})
		.attr("dy", "0.35em") 
		.style("font-size", tickSize)
		.attr("fill", "#bef4fd")
		.text(d => d.data.label);	
		
	svg.append("text")
		.attr("x", width - margin.right)
		.attr("y", margin.top)
		.attr("text-anchor", "end")
		.style("font-size", titleSize)
		.style("font-family", "Arial, sans-serif")
		.style("fill", "#042d7f")
		.each(function() {
			const titleLines = ["Distribution", "of", "Images"];
			titleLines.forEach((line, i) => {
				d3.select(this)
					.append("tspan")
					.text(line)
					.attr("x", width - margin.right)
					.attr("dy", i === 0 ? "0em" : "1.2em");
			});
		});
		
	if (fontSize != "small"){			
// 		const legendData = [
// 			{ label: "Train", color: "#0762AD", pct:"80%"},
// 			{ label: "Pneumonia", color: "#0762AD", pct:"53%" },
// 			{ label: "Normal", color: "#438FCE", pct:"20%" },
// 			{ label: "COVID", color: "#8AC5F7", pct:"7%" },
// 			{ label: "Test", color: "#0492C9", pct:"20%" },
// 			{ label: "Pneumonia", color: "#0492C9", pct:"13%" },
// 			{ label: "Normal", color: "#41B4E0", pct:"5%" },
// 			{ label: "COVID", color: "#6BCDF3", pct:"2%" }
// 		];
		const legendData = [
			{ label: "Train", color: "#0762AD", pct:"80%"},
			{ label: "Pneumonia", color: "#0762AD", pct:"66%" },
			{ label: "Normal", color: "#438FCE", pct:"25%" },
			{ label: "COVID", color: "#8AC5F7", pct:"9%" },
			{ label: "Test", color: "#0492C9", pct:"20%" },
			{ label: "Pneumonia", color: "#0492C9", pct:"65%" },
			{ label: "Normal", color: "#41B4E0", pct:"25%" },
			{ label: "COVID", color: "#6BCDF3", pct:"10%" }
		];
		
		
		const legend = svg.append("g")
			.attr("transform", `translate(${width - 100}, ${height - (legendData.length * 29 + 10)})`)
			.attr("class", "legend");

		legend.append("rect")
			.attr("x", -margin.left -20)
			.attr("y", -10)
			.attr("width", 260)
			.attr("height", legendData.length * 29 + 5)
			.style("fill", "none")
			.style("stroke", "#042d7f");
		
		legend.selectAll(".legend-item")
			.data(legendData)
			.enter()
			.append("g")
			.attr("class", "legend-item")
			.attr("transform", (d, i) => `translate(0, ${i * 28})`)
			.each(function(d) {
				xoffset = ((d.label === "Train") || (d.label === "Test")) ?
					margin.left : margin.left - 20;

				d3.select(this).append("rect")
					.attr("x", -10 - xoffset)
					.attr("y", 0)
					.attr("width", 20)
					.attr("height", 20)
					.style("fill", d.color);
		
				d3.select(this).append("text")
					.attr("x", 16 - xoffset)
					.attr("y", 16)
					.attr("dy", "0.2em")
					.text(d.label)
					.style("font-size", tickSize)
					.style("fill", "#042d7f");
					
				d3.select(this).append("text")
					.attr("x", 135)
					.attr("y", 16)
					.attr("dy", "0.2em")
					.attr("text-anchor", "end")
					.text(d.pct)
					.style("font-size", tickSize)
					.style("fill", "#042d7f");
			});
	}

}

const thumbnail1 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
    .attr("data-function", "drawTwoLevelPieChart")
    .style("background-color", "#bef4fd");  

const pieData = {
    outer: [
        { label: "Train", value: 5144 },
        { label: "Test", value: 1288 },
    ],
    inner: [
        { label: "Pneumonia", value: 3418 },
        { label: "Normal", value: 1266 },
        { label: "COVID", value: 460 },
        { label: "Pneumonia", value: 855 },
        { label: "Normal", value: 317 },
        { label: "COVID", value: 116 },
    ],
};
   
drawTwoLevelPieChart(thumbnail1, pieData, 400, 200, "small");

 
const thumbnail2 = tnContainer.append("svg")
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

drawEpochLineChart(thumbnail2, data, 400, 200, "small");

const thumbnail3 = tnContainer.append("svg")
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

const thumbnail4 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
	.style("background-color", "#ccc");

d3.selectAll(".thumbnail")
    .on("click", function() {
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
			} else if (chartType === "drawTwoLevelPieChart"){
				drawTwoLevelPieChart(confusion, pieData, 800, 624, "large");
			}

		}
    });
    
    
console.log("D3.js script loaded and ready for development");
