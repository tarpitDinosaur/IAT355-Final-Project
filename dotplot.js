// dimensions for svg size
var width = 1200;
var height = 200;

var margin = {top: 20, bottom: 20, left: 100, right:100};

// data from 2001
var leftScale = d3.scale.linear()
	.domain([25000, 135000])
	.range([width]);

// data from 2006
var middleScale = d3.scale.linear()
	.domain([25000, 135000])
	.range([width]);	

// data from 2011
var rightScale = d3.scale.linear()
	.domain([25000, 135000])
	.range([width]);	

// select div to display svg
var svg = d3.select("#dotplot")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// load csv
d3.csv('http://www.sfu.ca/~atso/test_data.csv', function(d) {
	data = d;

	// ================ BEGIN LINES ================= //
	var lines = svg.selectAll("line")
		.data(data);

	lines.enter()
		.append("line")
	 	.attr("x1", 400)
	 	.attr("x2", function(d) {
	 		return middleScale(parseFloat(d['2006']));
	 	})
		.attr("y1", 150)
	 	.attr("y2", 150)

	 	// line style
	 	.attr("stroke", "#666666")
	 	.attr("stroke-width", 1);

	});