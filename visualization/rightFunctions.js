// Draws a single line chart, not used in the submission, 
// but retained for future use
function drawEpochLineChart(svg, lineData, width, height, fontSize) {
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

	// Axes and ticks
    const xScale = d3.scaleLinear()
        .domain(d3.extent(lineData, d => d.epoch))
        .range([0, chartWidth]);

    const yScale = d3.scaleLog()
        .domain([d3.max(lineData, d => d.loss), d3.min(lineData, d => d.loss)])
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
        
	// Chart labels   
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
    
    // Title
    chart.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", titleSize)
        .style("font-weight", "bold")
        .style("fill", "#042d7f")
        .text("Epoch vs Training Loss");    

	// Line
    const line = d3.line()
        .x(d => xScale(d.epoch))
        .y(d => yScale(d.loss));

    chart.append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", "#042d7f")
        .attr("stroke-width", 3)
        .attr("d", line);

    chart.selectAll(".point")
        .data(lineData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.epoch))
        .attr("cy", d => yScale(d.loss))
        .attr("r", 5)
        .attr("fill", "#042d7f");      
}

// Draws a multi-line chart from the Epochs line data
function drawMultiEpochLineChart(svg, lineData, width, height, fontSize) {
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
    const strokeWidth = fontSize === "small" ? 2 :  4;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

	// Custom colorscale for lines
    const colorScale = d3.scaleOrdinal()
        .domain(lineData.map(d => d.model))
        .range(["#3edffd", "#064f8d", "#0e8cd2", "#042d7f"]);

	// Axes and ticks
    const xScale = d3.scaleLinear()
        .domain([1, 10])
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([d3.max(lineData, d => d3.max(d.values, v => v.loss)), d3.min(lineData, d => d3.min(d.values, v => v.loss))])
        .range([0, chartHeight]);

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(5, ".1");

    chart.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", tickSize);

    chart.append("g")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", tickSize);
        
	// Lines
    lineData.forEach(model => {
        const line = d3.line()
            .x(d => xScale(d.epoch))
            .y(d => yScale(d.loss));

        chart.append("path")
            .datum(model.values)
            .attr("fill", "none")
            .attr("stroke", colorScale(model.model))
            .attr("stroke-width", strokeWidth)
            .attr("d", line);
    });
    
	// Labels
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

	// Title
	chart.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", titleSize)
        .style("font-weight", "bold")
        .style("fill", "#042d7f")
        .text("Epoch vs Training Loss");
    
    // Legend only for the large version
    if (fontSize !== "small"){	
    	const labelSizeNumber = parseInt(labelsSize, 10);
		const legYOffset = 10;
		const legXOffset = 50;
		const legend = svg.append("g")
			.attr("transform", `translate(${width - margin.right - 120 - legXOffset}, ${margin.top + chartHeight/4})`);
	
		lineData.forEach((d, i) => {
			legend.append("circle")
				.attr("cx", - legXOffset/5)
				.attr("cy", i * (labelSizeNumber + legYOffset))
				.attr("r", legYOffset)
				.style("fill", colorScale(d.model));
		
			legend.append("text")
				.attr("x", 5 )
				.attr("y", i * (labelSizeNumber + legYOffset))
				.attr("dy", "0.35em")
				.style("font-size", labelsSize)
				.text(d.model);
		});}
}

// Grouped bar chart for F1 and Balanced Accuracy deltas
function drawGroupedBarChart(svg, barData, width, height, fontSize) {
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
    const strokeWidth = fontSize === "small" ? 2 :  4;
 	const labelSizeNumber = parseInt(labelsSize, 10);
    const legYOffset = fontSize === "small" ? 5 :  10;
    const legXOffset = fontSize === "small" ? 0 :  50;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

	// Calculate the deltas, for each model based on the Baseline model
	const baseline = barData.find(d => d.model === "Baseline");
	const differenceData = barData.map(d => ({
		model: d.model,
		metrics: [
				{ key: "balanced_accuracy_diff", label: "Accuracy Delta", value: d.balanced_accuracy - baseline.balanced_accuracy },
				{ key: "F1_score_weighted_diff", label: "F1 Delta", value: d.F1_score_weighted - baseline.F1_score_weighted }
			]
	}));
	
	const models = differenceData.map(d => d.model);
	const metrics = [
		{ key: "balanced_accuracy_diff", label: "Accuracy Delta" },
		{ key: "F1_score_weighted_diff", label: "F1 Delta" }
	];
	
	// Custom color scale
	const colorScale = d3.scaleOrdinal()
		.domain(metrics.map(metric => metric.key))
		.range(["#3edffd", "#0762ad"]);
			
	// Axes and ticks
	const xScale = d3.scaleBand()
		.domain(models)
		.range([0, chartWidth])
		.padding(0.2);
	
	const xSubScale = d3.scaleBand()
		.domain(metrics.map(metric => metric.key))
		.range([0, xScale.bandwidth()])
		.padding(0.1);
	
	const yScale = d3.scaleLinear()
		.domain([
			d3.min(differenceData, d => d3.min(d.metrics, m => m.value)),
			d3.max(differenceData, d => d3.max(d.metrics, m => m.value))
		])
		.range([chartHeight, 0])
		.nice();
	
	chart.append("g")
		.attr("transform", `translate(0, ${chartHeight})`)
		.call(d3.axisBottom(xScale))
		.selectAll("text")
		.style("font-size", tickSize);
	
	chart.append("g")
		.call(d3.axisLeft(yScale).ticks(5))
		.selectAll("text")
		.style("font-size", tickSize);
	
	// Bars
	chart.append("g")
		.selectAll("g")
		.data(differenceData)
		.enter()
		.append("g")
		.attr("transform", d => `translate(${xScale(d.model)}, 0)`)
		.selectAll("rect")
		.data(d => d.metrics)
		.enter()
		.append("rect")
		.attr("x", d => xSubScale(d.key))
		.attr("y", d => yScale(d.value))
		.attr("width", xSubScale.bandwidth())
		.attr("height", d => chartHeight - yScale(d.value))
		.attr("fill", d => colorScale(d.key));

	// Labels
	chart.append("text")
		.attr("x", chartWidth / 2)
		.attr("y", chartHeight + yoffset)
		.attr("text-anchor", "middle")
		.style("font-size", labelsSize)
		.style("fill", "#042d7f")
		.text("Models");

	chart.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -chartHeight / 2)
		.attr("y", -100)
		.attr("text-anchor", "middle")
		.style("font-size", tickSize)
		.style("fill", "#042d7f")
		.text("Difference in Metric from Baseline");

	chart.append("text")
		.attr("x", width/2 - margin.left)
		.attr("y", -margin.top / 4)
		.attr("text-anchor", "middle")
		.style("font-size", titleSize)
		.style("font-weight", "bold")
		.style("fill", "#042d7f")
		.text("Balanced Accuracy & F1 Score Deltas");
	
	//Legend only for the large sized chart
	if (fontSize !== "small"){	
		const labelSizeNumber = parseInt(labelsSize, 10);
		const legend = chart.append("g")
			.attr("transform", `translate(${chartWidth - 120}, 0)`);
		
		metrics.forEach((metric, i) => {
			const legendItem = legend.append("g")
				.attr("transform", `translate(0, ${i * (legYOffset + 10)})`);
		
			legendItem.append("circle")
				.attr("cx", 0)
				.attr("cy", i * (labelSizeNumber/5 + 5))
				.attr("r", legYOffset)
				.style("fill", colorScale(metric.key));
		
			legendItem.append("text")
				.attr("x", legYOffset + 5)
				.attr("y", i * (labelSizeNumber/5 + 5))
				.attr("dy", "0.35em")
				.style("font-size", tickSize)
				.text(metric.label);
		});}		
}

// Draws 2 level pie chart for the image distribution
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
	
	// Custom colorscale
	const outerColorScale = d3.scaleOrdinal()
		.domain(["Test", "Train"]) 
		.range(outerColors); 
	
	const innerColorScale = d3.scaleOrdinal()
		.domain(["COVID", "Pneumonia", "Normal",])
		.range(innerColors);

	// Arcs
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

    // Outer pie
    chartGroup.selectAll(".outer-slice")
        .data(pie(data.outer))
        .enter()
        .append("path")
        .attr("class", "outer-slice")
        .attr("d", outerArc)
        .attr("fill", (d, i) => outerColorScale(i))
        .style("stroke", "#bef4fd")
        .style("stroke-width", "2px");

    // Inner pie
    chartGroup.selectAll(".inner-slice")
        .data(pie(data.inner))
        .enter()
        .append("path")
        .attr("class", "inner-slice")
        .attr("d", innerArc)
        .attr("fill", (d, i) => innerColorScale(i))
        .style("stroke", "#bef4fd")
        .style("stroke-width", "2px");

    // Labels outer pie
    chartGroup.selectAll(".outer-label")
        .data(pie(data.outer))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${outerArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("fill", "#bef4fd")
        .style("font-size", tickSize)
        .text(d => d.data.label);
        
    // Labels inner pie
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
		
	// Title
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
		
	// Legend only for large version
	if (fontSize != "small"){			
		
		const legend = svg.append("g")
			.attr("transform", `translate(${width - 100}, ${height - (pieLegendData.length * 29 + 10)})`)
			.attr("class", "legend");

		legend.append("rect")
			.attr("x", -margin.left -20)
			.attr("y", -10)
			.attr("width", 260)
			.attr("height", pieLegendData.length * 29 + 5)
			.style("fill", "none")
			.style("stroke", "#042d7f");
		
		legend.selectAll(".legend-item")
			.data(pieLegendData)
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

// Draws thumbnails of the graphs and manages the on click interactions
function DrawAnalytics(tnCont, confsn){
	// Upper left
	const thumbnail1 = tnCont.append("svg")
		.classed("thumbnail", true)
		.attr("viewBox", "0 0 400 200")
		.attr("data-function", "drawTwoLevelPieChart")
		.style("background-color", "#bef4fd");  
	
	drawTwoLevelPieChart(thumbnail1, pieData, 400, 200, "small");
	
	// Upper right
	const thumbnail2 = tnCont.append("svg")
		.classed("thumbnail", true)
		.attr("viewBox", "0 0 400 200")
		.attr("data-function", "drawEpochLineChart")
		.style("background-color", "#bef4fd");
	
	drawMultiEpochLineChart(thumbnail2, epochData, 400, 200, "small")
	
	// Lower left
	const thumbnail3 = tnCont.append("svg")
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
	
	// Lower right
	const thumbnail4 = tnCont.append("svg")
		.classed("thumbnail", true)
		.attr("viewBox", "0 0 400 200")
		.style("background-color", "#bef4fd");
		
	drawGroupedBarChart(thumbnail4, metricsData, 400, 200, "small");
	
	// Clock listener for thumbnails, shows larger version of graph above
	d3.selectAll(".thumbnail")
		.on("click", function() {
			confsn.selectAll("*").remove();
			d3.selectAll(".thumbnail").classed("thumbnail-border", false);
			d3.select(this).classed("thumbnail-border", true);
			
			const thumbnail = d3.select(this);
			const image = thumbnail.select("image").node();
			
			if (image) {
				const width = +image.getAttribute("width");
				const height = +image.getAttribute("height");	
			
				confsn
					.attr("viewBox", `0 0 ${width} ${height}`)
					.attr("width", width)
					.attr("height", height);
				const clonedImage = image.cloneNode(true);
					d3.select(clonedImage).classed("dynamic-image", true);
					confsn.node().appendChild(clonedImage);
				
				d3.select(clonedImage)
					.classed("dynamic-image", true)
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", width)
					.attr("height", height)
					.style("transform", "none");			
			} else {
				confsn
					.attr("class", "dynamic-element")
					.style("background-color", "#bef4fd99")
				const chartType = thumbnail.attr("data-function");
				if (chartType === "drawEpochLineChart") {
					drawMultiEpochLineChart(confsn, epochData, 800, 700, "large")
				} else if (chartType === "drawTwoLevelPieChart"){
					drawTwoLevelPieChart(confsn, pieData, 800, 624, "large");
				} else {
					drawGroupedBarChart(confsn, metricsData, 800, 700, "large");
				}
	
			}
		});
}


console.log("Right Functions loaded...");


