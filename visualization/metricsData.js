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