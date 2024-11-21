// Converts labels to camel case except COVID
function formatLabel(label) {
    if (label === "COVID19") return label;
    return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
}

// Produces colors and labels for the predictions in the Results
function getColorAndPredictionLabel(predToGet = "original", XRayID, actualLabel) {
    
    // Default
    const defaultResult = { color: "#042d7f", label: "Prediction" };

    if (!predData[XRayID]) {
        return defaultResult;
    }

    const predictionData = predData[XRayID];
    const predictions = predictionData.predictions;

	// allows for prediction based on the original image, 
	// though this is never displayed
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

	// uses a global color scale
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
    
    // Add the test for the percentage for accessibility
    const percentage = (predictedProbability * 100).toFixed(0);
    const label = `${formatLabel(predictedLabel)} ${percentage}%`;

    return { color , label };
}


// Draws the augment images without predictions
function DrawAugments(resultsCont, xrID) {
	console.log(`xrID is ${xrID}`)
	let bmargin = "5px";
	
	// Augment (test) images are uniquely identified by the ID
	for (const range of testRangeData) {
        if (xrID >= range.low && xrID <= range.high) {
            xrayActual = range.label;
            break;
        }
    }
    
    const thumbnails = [
        { id: "#xraythumb3", label: "Brightness x 1.2", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrID})_200x150_augbr.jpg` },
        { id: "#xraythumb4", label: "Contrast x 1.1", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrID})_200x150_augct.jpg` },
        { id: "#xraythumb5", label: "Blur x 0.0", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrID})_200x150_augbl.jpg` },
        { id: "#xraythumb6", label: "Sharpen x 2.0", img: `./images/Data_aug_200x150/test/${xrayActual}/${xrayActual}(${xrID})_200x150_augsh.jpg` }
    ];
    
    // Clear the container and draw the augments
    // DrawAugments draws all predictions, but does not display them
	resultsCont.html("");
	
	// Draw the overall model prediction
	const overallPrediction = resultsCont.append("div")
		.attr("class", "overall-prediction")
		.style("display", "none");

    const predictedLabel = predData[xrID]?.predicted_label || "Unknown";
    if (predictedLabel.toLowerCase() === xrayActual.toLowerCase()) {
    	predictionColor = correctColorScale[3]
    }
    else {
    	predictionColor = incorrectColorScale[3]
    }
    overallPrediction
		.html(`Model Prediction: ${formatLabel(predictedLabel)}<br>Actual Label: ${formatLabel(xrayActual)}`)
		.style("color", predictionColor);

	// Add predictions, thumbnail images, and labels for augments 
    let thumbnailContainer = resultsCont.append("div")
			.classed("xray-thumbnail-container", true);
	    
	img1 = `./images/Data_200x150/test/${xrayActual}/${xrayActual}(${xrID})_200x150.jpg`
	
	const resHFlip = getColorAndPredictionLabel("horizontal_flip", xrID, xrayActual);
	const res5deg = getColorAndPredictionLabel("5_degree_rotation", xrID, xrayActual);

	// thumbs 1 and 2 are drawn individually bc of the flip and rotate
	thumbnailContainer.append("p")
		.text(resHFlip.label)
		.classed("prediction", true)
		.attr("xrayActual", xrayActual)
		.attr("xrayID", xrID)
		.style("text-align", "center")
		.style("font-size", "14pt")
		.style("color", resHFlip.color)
		.style("font-weight", "bold")
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
		.attr("xrayID", xrID)
		.style("text-align", "center")
		.style("font-size", "14pt")
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
	
	// The rest are drawn iteratively
	const resBlur = getColorAndPredictionLabel("increase_blur", xrID, xrayActual);
	const resBright = getColorAndPredictionLabel("increase_brightness", xrID, xrayActual);
	const resSharp = getColorAndPredictionLabel("increase_sharpness", xrID, xrayActual);
	const resContr = getColorAndPredictionLabel("increase_contrast", xrID, xrayActual);

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
			.attr("xrayID", xrID)
			.style("text-align", "center")
			.style("font-size", "14pt")
			.style("color", pcolor)
			.style("font-weight", "bold")
			.style("display", "none");
			
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

// Draws Similar Xrays feature
function DrawSimilarXrays(resultsCont, oneSimXray, xrayAct, xrayID) {
	let bmargin = "5px";
	
	// Create the meta data for the draw
    let TBs = [];
    let toDraw = {};
    oneSimXray.forEach(item => {
    	console.log(item);
		const simID = item[1];
		const simLabel = item[0];
	
		toDraw = { id: "#xraythumb1", label: `${simLabel}(${simID})`, img: `./images/Data_200x150/train/${simLabel}/${simLabel}(${simID})_200x150.jpg` },
		TBs.push(toDraw);
	});
    
	// Clear the container and draw the similars and labels iteratively
	resultsCont.html("");
		
	const overallPrediction = resultsCont.append("div")
		.attr("class", "overall-prediction")
		.style("display", "none"); 
			
	TBs.forEach(({ id, label, img }) => {
		
		const thumbnailContainer = resultsCont.append("div")
			.classed("xray-thumbnail-container", true);
		
		thumbnailContainer.append("p")
			.text("Prediction")
			.classed("prediction", true)
			.attr("xrayActual", xrayAct)
			.attr("xrayID", xrayID)
			.style("text-align", "center")
			.style("font-size", "14pt")
			.style("color", "#042d7f")
			.style("font-weight", "bold")
			.style("display", "none");
			
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

// Draw the buttons for Augments, Results, and Similars and handle clicks
function DrawMiddleButtons(){
	const mwidth = rescontainer.node().clientWidth * widthPercentage - 5;
	const mmargin = 0
	
	const resbuttons = middleColumn.append("div")
		.attr("id", "results-button-container")
		.style("margin-top", "3px")
		.append("svg")
		.attr("height", middleColumnHeight * heightPercentage)
		
	// Draw Similar button
	const simButton = resbuttons.append("path")
		.attr("d", `
			M ${mmargin + 2 * mwidth}, 5 
			h ${mwidth - radius} 
			a ${radius},${radius} 0 0 1 ${radius},${radius} 
			a ${radius},${radius} 0 0 1 -${radius},${radius} 
			h -${mwidth - radius}
			z
		`)
		.style("fill", "#3edffd")
		.style("stroke", "#16afeb")
		.style("stroke-mwidth", 3);
	
	const simButtonLabel =resbuttons.append("text")
		.attr("x", 2 * (mmargin + mwidth) + mwidth / 2 + mmargin / 2)
		.attr("y", 5 + height / 4)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Similar")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");
	
	// Draw Results button
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

	// Draw Augments Button
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
	
	// Click handlers
	resultsLabel.on("click", () => {
		const tbnails = document.querySelectorAll('.prediction');
		const selectedTbnail = tbnails[0];
		const xrID = parseInt(selectedTbnail.getAttribute('xrayID'), 10);
		const xrActual = selectedTbnail.getAttribute('xrayActual');
		DrawAugments(rescontainer, xrID)
		turnOnResults();
	});
	resultsButton.on("click", () => {
		const tbnails = document.querySelectorAll('.prediction');
		const selectedTbnail = tbnails[0];
		const xrID = parseInt(selectedTbnail.getAttribute('xrayID'), 10);
		const xrActual = selectedTbnail.getAttribute('xrayActual');
		DrawAugments(rescontainer, xrID)
		turnOnResults();
	});
	
	augButton.on("click", () => {
		const tbnails = document.querySelectorAll('.prediction');
		const selectedTbnail = tbnails[0];
		const xrID = parseInt(selectedTbnail.getAttribute('xrayID'), 10);
		const xrActual = selectedTbnail.getAttribute('xrayActual');
		DrawAugments(rescontainer, xrID)
	});

	augLabel.on("click", () => {	
		const tbnails = document.querySelectorAll('.prediction');
		const selectedTbnail = tbnails[0];
		const xrID = parseInt(selectedTbnail.getAttribute('xrayID'), 10);
		const xrActual = selectedTbnail.getAttribute('xrayActual');
		DrawAugments(rescontainer, xrID)
	});
	
	simButton.on("click", () => {	
		const tbnails = document.querySelectorAll('.prediction');
		const selectedTbnail = tbnails[0];
		const xrID = parseInt(selectedTbnail.getAttribute('xrayID'), 10);
		const xrActual = selectedTbnail.getAttribute('xrayActual');
		DrawSimilarXrays(rescontainer, allSimilarsData[xrID]["similars"],xrayActual, xrID)
	});
	
	simButtonLabel.on("click", () => {	
		const tbnails = document.querySelectorAll('.prediction');
		const selectedTbnail = tbnails[0];
		const xrID = parseInt(selectedTbnail.getAttribute('xrayID'), 10);
		const xrActual = selectedTbnail.getAttribute('xrayActual');
		DrawSimilarXrays(rescontainer, allSimilarsData[xrID]["similars"],xrayActual, xrID)
	});
}

// Click helper function for Results  button click handler
function turnOnResults() {
	const predictionDiv = rescontainer.select(".overall-prediction");
	const predictions = rescontainer.selectAll(".prediction");
 	const predDisplay = predictionDiv.style("display")
	predictionDiv.style("display", "block");
	predictions.each(function (d, i) {
		d3.select(this).style("display", "block");
		const actualLabel = d3.select(this).attr("xrayActual");
		const XRayID = d3.select(this).attr("xrayID");
	});
}


console.log("Middle Functions loaded...");