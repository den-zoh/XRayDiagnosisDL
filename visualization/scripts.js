const xraybuttons = leftColumn.select("#button-container")
    .append("svg")
    .attr("width", leftColumnWidth)
    .attr("height", leftColumnHeight * heightPercentage)

DrawXRayButtons(xraybuttons)

const chooser = d3.select("#xray-chooser-container")
    .attr("width", "100%")
    .attr("height", "20%");

DrawChooserList()

const xraychooser = leftColumn.select("#xray-chooser-button-container")
    .append("svg")
    .attr("width", leftColumnWidth)
    .attr("height", margin + leftColumnHeight * heightPercentage/2)
    
DrawChooserButtons(xraychooser)

// Middle Column
const rescontainer = middleColumn.append("div")
		.attr("id", "results-container")
		.classed("results-container", true)
		.style("margin-top", "25px");

DrawAugments(rescontainer, 552)
DrawMiddleButtons()

// Right Column    
const confusion = d3.select("#confusion")
    .attr("viewBox", "0 0 785 624")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("width", "100%")
    .attr("height", "50%");

const tnContainer = rightColumn.append("div").classed("thumbnail-container", true);

const thumbnail1 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
    .attr("data-function", "drawTwoLevelPieChart")
    .style("background-color", "#bef4fd");  

drawTwoLevelPieChart(thumbnail1, pieData, 400, 200, "small");

const thumbnail2 = tnContainer.append("svg")
    .classed("thumbnail", true)
    .attr("viewBox", "0 0 400 200")
	.attr("data-function", "drawEpochLineChart")
	.style("background-color", "#bef4fd");

drawMultiEpochLineChart(thumbnail2, epochData, 400, 200, "small")

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
	.style("background-color", "#bef4fd");
	
drawGroupedBarChart(thumbnail4, metricsData, 400, 200, "small");

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
				drawMultiEpochLineChart(confusion, epochData, 800, 700, "large")
			} else if (chartType === "drawTwoLevelPieChart"){
				drawTwoLevelPieChart(confusion, pieData, 800, 624, "large");
			} else {
				drawGroupedBarChart(confusion, metricsData, 800, 700, "large");
			}

		}
    });
    
console.log("Script loaded...");
