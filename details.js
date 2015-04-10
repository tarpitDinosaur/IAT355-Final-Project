var width = 640;
var height = 10000;

var margin = {top: 20, bottom: 20, left: 100, right:100};

// data from 2001
var leftScale = d3.scale.linear()
	.domain([0, 133000])
	.range([height - margin.top, margin.bottom]);

// data from 2006
var middleScale = d3.scale.linear()
	.domain([0, 133000])
	.range([height - margin.top, margin.bottom]);	

// data from 2011
var rightScale = d3.scale.linear()
	.domain([0, 133000])
	.range([height - margin.top, margin.bottom]);	

var numericalFormatter = d3.format("0,.0f");

var svg = d3.select("#slopegraph")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// load csv
d3.csv('http://www.sfu.ca/~atso/census_data.csv', function(d) {
	data = d;
	
	// ================ BEGIN LINES ================= //

	// lines from 2001 - 2006
	var leftLines = svg.selectAll(".line")
	 	.data(data);
		
	 leftLines.enter()
		.append("line")
	 	.attr("class","left-line")
	 	.attr("x1", margin.left)
	 	.attr("x2", width/2 - 10)
	 	.attr("y1", function(d) {
	 		return leftScale(parseFloat(d['2001']));
	 	})
	 	.attr("y2", function(d) {
	 		return middleScale(parseFloat(d['2006']));
	 	})

	 	// line style
	 	.attr("stroke", "#666666")
	 	.attr("stroke-width", 1);

	// lines from 2006 - 2011
	var rightLines = svg.selectAll(".line")
		.data(data);

	rightLines.enter()
		.append("line")
		.attr("class","right-line")
		.attr("x1", width/2 + 50)
		.attr("x2", width - margin.right)
		.attr("y1", function(d) {
			return middleScale(parseFloat(d['2006']));
		})
		.attr("y2", function(d) {
			return rightScale(parseFloat(d['2011']));
		})

	// line style
	.attr("stroke", "#666666")
	.attr("stroke-width", 1);

	// ================ END LINES ================= //

	// ================ BEGIN LABELS ================= //

	// label 2011 data
	var rightLabels = svg.selectAll(".right-labels")
		.data(data);
		
	rightLabels.enter()
		.append("text")
		.attr("class","right-labels")
		.attr("x", width - margin.right)
		.attr("y", function(d) {
			return rightScale(parseFloat(d['2011']));
		})
		.text(function (d) {
			return numericalFormatter(d['2011']) + " " + d['Category'];
		});

	// label 2006 data
	var middleLabels = svg.selectAll(".middle-labels")
		.data(data);
		
	middleLabels.enter()
		.append("text")
		.attr("class","middle-labels")
		.attr("x", width/2)
		.attr("y", function(d) {
			return middleScale(parseFloat(d['2006'])) + 4;
		})
		.text(function (d) {
			return numericalFormatter(d['2006']);
		});
	
	// label 2001 data
	var leftLabels = svg.selectAll(".left-labels")
		.data(data);
		
	leftLabels.enter()
		.append("text")
		.attr("class","left-labels")
		.attr("x", margin.left - 105)
		.attr("y", function(d) {
			return leftScale(parseFloat(d['2001'])) + 4;
		})
		.text(function (d) {
			return d['Category'] + " " + numericalFormatter(d['2001']);
		})
		//.style("begin");
		.style.textAlign="right";
	
	// title
	// svg.append("text")
	// 	.attr("x", width / 2)
	// 	.attr("y", margin.top)
	// 	.attr("class", "chart-title")
	// 	.text("Surrey Census Population, 2001-2011");

	// years
	// svg.append("text")
	// 	.attr("class","years-label")
	// 	.attr("x", margin.left - 60)
	// 	.attr("y", margin.top + 14)
	// 	.text("2001");

	// svg.append("text")
	// 	.attr("class","years-label")
	// 	.attr("x", width/2 + 3)
	// 	.attr("y", margin.top + 14)
	// 	.text("2006");

	// svg.append("text")
	// 	.attr("class","years-label")
	// 	.attr("x", width - margin.right + 40)
	// 	.attr("y", margin.top + 14)
	// 	.text("2011");


	// ================ END LABELS ================= //
});

function lineThicknessLeft(d){
	if (1 - (d["2001"] / d["2006"]) > 0.25) return "9";
	
	if ((1 - (d["2001"] / d["2006"]) < 0.24) && (1 - (d["2001"] / d["2006"]) > 0.15)) return "6";

	if ((1 - (d["2001"] / d["2006"]) < 0.14) && (1 - (d["2001"] / d["2006"]) > 0.05)) return "3";
	
	if (1 - (d["2001"] / d["2006"]) < 0.04) return "1";
}

function lineThicknessRight(d){
	if (1 - (d["2006"] / d["2011"]) > 0.25) return "9";
	
	if ((1 - (d["2006"] / d["2011"]) < 0.24) && (1 - (d["2006"] / d["2011"]) > 0.15)) return "6";

	if ((1 - (d["2006"] / d["2011"]) < 0.14) && (1 - (d["2006"] / d["2011"]) > 0.05)) return "3";
	
	if (1 - (d["2006"] / d["2011"]) < 0.04) return "1";
}

// function lineColour(d){
// 	if(d["2011"] + d["2006"] + d["2001"] < 30000) return "black";
// 	if((d["2011"] + d["2006"] + d["2001"] >= 30000) && (d["2011"] + d["2006"] + d["2001"] <= 59999)) return "lightblue";
// 	if((d["2011"] + d["2006"] + d["2001"] >= 60000) && (d["2011"] + d["2006"] + d["2001"] <= 99999)) return "#9DB6FC";
// 	if((d["2011"] + d["2006"] + d["2001"] >= 10000) && (d["2011"] + d["2006"] + d["2001"] <= 129999)) return "#86A5FC";
// 	if(d["2011"] + d["2006"] + d["2001"] > 130000) return "#628CFC";
	
// }
