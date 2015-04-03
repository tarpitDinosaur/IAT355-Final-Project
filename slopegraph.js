var width = 700;
var height = 600;

var margin = {top: 20, bottom: 20, left: 100, right:100};

var leftScale = d3.scale.linear()
	.domain([29000, 110000])
	.range([height - margin.top, margin.bottom]);

var middleScale = d3.scale.linear()
	.domain([29000, 110000])
	.range([height - margin.top, margin.bottom]);	

var currencyFormatter = d3.format("0,.0f");

var svg = d3.select("#slopegraph")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

d3.csv('http://www.sfu.ca/~atso/test_data.csv', function(d) {
	data = d;
	
	var lines = svg.selectAll("line")
		.data(data);
		
	lines.enter()
		.append("line")
		.attr("x1", margin.left)
		.attr("x2", width - margin.right)
		.attr("y1", function(d) {
			return leftScale(parseFloat(d['2001']));
		})
		.attr("y2", function(d) {
			return middleScale(parseFloat(d['2006']));
		})
		.attr("stroke", "black")
		.attr("stroke-width", 1);

	var rightLabels = svg.selectAll(".labels")
		.data(data);
		
	rightLabels.enter()
		.append("text")
		.attr("class","labels")
		.attr("x", width - margin.right + 3)
		.attr("y", function(d) {
			return middleScale(parseFloat(d['2006'])) + 4;
		})
		.text(function (d) {
			return d['Population'] + " " + currencyFormatter(d['2006']);
		});
	
	var leftLabels = svg.selectAll(".left-labels")
		.data(data);
		
	leftLabels.enter()
		.append("text")
		.attr("class","left-labels")
		.attr("x", margin.left - 65)
		.attr("y", function(d) {
			return leftScale(parseFloat(d['2001'])) + 4;
		})
		.text(function (d) {
			return d['Population'] + " " + currencyFormatter(d['2001']);
		})
		.style("text-anchor","begin");
		
	svg.append("text")
		.attr("x", width / 2)
		.attr("y", margin.top)
		.attr("class", "chart-title")
		.text("Surrey Census Population, 2001-2006");
});