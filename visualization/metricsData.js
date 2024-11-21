// This is real data either produced by the model or collected manually
const testRangeData = [
			{ label: "PNEUMONIA", low: 3418, high:4272 },
			{ label: "NORMAL", low: 1266, high:1582 },
			{ label: "COVID19", low: 460, high:575 }
];

const trainRangeData = [
			{ label: "PNEUMONIA", low: 0, high:3417 },
			{ label: "NORMAL", low: 0, high:1265 },
			{ label: "COVID19", low: 0, high:459 }
];

const samples = [
    552, 1266, 1451, 520, 1308, 561, 4062, 
    3497, 3904, 3451, 490, 1462
];

const metricsData = [
	{
		model: "Baseline",
		balanced_accuracy: 0.9410032402397874,
		F1_score_weighted: 0.949061539979598,
	},
	{
		model: "Tuned CNN",
		balanced_accuracy: 0.9396067310304114,
		F1_score_weighted: 0.9461417162436264,
	},
	{
		model: "MobileNetV2",
		balanced_accuracy: 0.9402844439016126,
		F1_score_weighted: 0.9250281820340688,
	},
	{
		model: "ResNet18",
		balanced_accuracy: 0.9292532414590388,
		F1_score_weighted: 0.9253336254089309,
	},
];

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

const pieLegendData = [
			{ label: "Train", color: "#0762AD", pct:"80%"},
			{ label: "Pneumonia", color: "#0762AD", pct:"66%" },
			{ label: "Normal", color: "#438FCE", pct:"25%" },
			{ label: "COVID", color: "#8AC5F7", pct:"9%" },
			{ label: "Test", color: "#0492C9", pct:"20%" },
			{ label: "Pneumonia", color: "#0492C9", pct:"65%" },
			{ label: "Normal", color: "#41B4E0", pct:"25%" },
			{ label: "COVID", color: "#6BCDF3", pct:"10%" }
		];

console.log("Metrics data loaded...");