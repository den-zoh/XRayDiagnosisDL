// Main app page: creates top level global elements
// Left Column
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

DrawAnalytics(tnContainer, confusion)


console.log("Script loaded...");
