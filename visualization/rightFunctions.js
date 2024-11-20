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


function drawMultiEpochLineChart(svg, data, width, height, fontSize) {
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

    const xScale = d3.scaleLinear()
        .domain([1, 10])
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([d3.max(data, d => d3.max(d.values, v => v.loss)), d3.min(data, d => d3.min(d.values, v => v.loss))])
        .range([0, chartHeight]);

    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.model))
        .range(["#3edffd", "#064f8d", "#0e8cd2", "#042d7f"]);

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
        
    data.forEach(model => {
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
    
 	const labelSizeNumber = parseInt(labelsSize, 10);
    const legYOffset = fontSize === "small" ? 5 :  10;
    const legXOffset = fontSize === "small" ? 0 :  50;
    
    const legend = svg.append("g")
		.attr("transform", `translate(${width - margin.right - 120 - legXOffset}, ${margin.top + chartHeight/4})`);

	console.log(labelSizeNumber)
	data.forEach((d, i) => {
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
	});
}


function drawGroupedBarChart(svg, data, width, height, fontSize) {
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

	const baseline = metricsData.find(d => d.model === "Baseline");
const differenceData = metricsData.map(d => ({
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

const colorScale = d3.scaleOrdinal()
    .domain(metrics.map(metric => metric.key))
    .range(["#3edffd", "#0762ad"]);

chart.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .style("font-size", tickSize);

chart.append("g")
    .call(d3.axisLeft(yScale).ticks(5))
    .selectAll("text")
    .style("font-size", tickSize);

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

console.log("Right Functions loaded...");


