function DrawXRayButtons(svg){
	svg.append("path")
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
	
	svg.append("text")
		.attr("x", 2 * (margin + width) + width / 4 + margin / 2)
		.attr("y", 5 + height / 4)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Segmentation")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");
	
	svg.append("rect")
		.attr("x", margin + width)
		.attr("y", 5)
		.attr("width", width)
		.attr("height", height/2)
		.style("fill", "#0e8cd2")
		.style("stroke", "#16afeb")
		.style("stroke-width", 3);
	
	svg.append("text")
		.attr("x", (margin + width) + width / 2)
		.attr("y", 5 + height / 4)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Heat Map")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");
	
	svg.append("path")
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
	
	svg.append("text")
		.attr("x", margin + width / 2)
		.attr("y", 5 + height / 4)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("XRay")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");
}


function DrawChooserList(){
	let fileList = [];
	let actLabel = ""
	const defaultIndex = 0
	for (const sample of samples) {
		for (const range of testRangeData) {
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
}

function DrawChooserButtons(svg){
	svg.append("path")
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
		
	svg.append("text")
		.attr("x", 2 * (margin + width) + (margin + width) / 4 + margin/4)
		.attr("y", height / 4 + 10)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Use Sample XRay")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold");
		
	svg.append("path")
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
	
	svg.append("text")
		.attr("x", margin + width + width / 2)
		.attr("y", height / 4 + 10)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text("Upload XRay...")
		.style("fill", "#064f8d")
		.style("font-family", "Arial, sans-serif")
		.style("font-size", "16px")
		.style("font-weight", "bold"); 
	
}

console.log("Left Functions loaded...");