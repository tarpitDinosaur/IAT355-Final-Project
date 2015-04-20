var width = 980;
var height = 300;

var margin = {top: 20, bottom: 20, left: 100, right:100};

var lineHeight = 40;

// data from 2001
var leftScale = d3.scale.linear()
	.domain([29000, 135000])
	.range([100, 960]);

// data from 2006
var middleScale = d3.scale.linear()
	.domain([29000, 135000])
	.range([100, 960]);	

// data from 2011
var rightScale = d3.scale.linear()
	.domain([29000, 135000])
	.range([100, 960]);	

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
	 	.attr("name", function(d) {
	        return d['Category']
	      })
	 	.attr("y1", 80)
	 	.attr("y2", 80)
	 	.attr("x1", function(d) {
	 		return leftScale(parseFloat(d['2001']));
	 	})
	 	.attr("x2", function(d) {
	 		return middleScale(parseFloat(d['2006']))
	 	})

	 	// line style
	 	.attr("stroke", "#666666")
	 	.attr("stroke-width", 1)
	 	.attr("transform", function(d, i) { return "translate(0," + i * lineHeight + ")"; });

	// lines from 2006 - 2011
	var rightLines = svg.selectAll(".line")
		.data(data);

	rightLines.enter()
		.append("line")
		.attr("class","right-line")
		.attr("name", function(d) {
	        return d['Category']
	      })
		.attr("y1", 80)
	 	.attr("y2", 80)
	 	.attr("x1", function(d) {
	 		return middleScale(parseFloat(d['2006']));
	 	})
	 	.attr("x2", function(d) {
	 		return rightScale(parseFloat(d['2011']));
	 	})

	// line style
	.attr("stroke", "#666666")
	.attr("stroke-width", 1)
	.attr("transform", function(d, i) { return "translate(0," + i * lineHeight + ")"; });

	// // ================ END LINES ================= //

	// ================= BEGIN DOTS ================ //

	var leftDot = svg.selectAll(".circle")
        .data(data);
        
    leftDot.enter()
        .append("circle")
        .attr("name", function(d) {
	        return d['Category']
	      })
        .attr("cx", function (d) { 
        	return leftScale(parseFloat(d['2001'])); 
        })
        .attr("cy", 80)
        .attr("r", 5)
        .style("fill", d3.rgb(44, 160, 44))
        .attr("transform", function(d, i) { return "translate(0," + i * lineHeight + ")"; })
        .on("mouseover", showtooltip2001)
    	.on("mouseout", hidetooltip);

    var middleDot = svg.selectAll(".circle")
        .data(data);
        
    middleDot.enter()
        .append("circle")
        .attr("name", function(d) {
	        return d['Category']
	      })
        .attr("cx", function (d) { 
        	return middleScale(parseFloat(d['2006'])); 
        })
        .attr("cy", 80)
        .attr("r", 5)
        .style("fill", d3.rgb(31, 119, 180))
        .attr("transform", function(d, i) { return "translate(0," + i * lineHeight + ")"; })
        .on("mouseover", showtooltip2006)
    	.on("mouseout", hidetooltip);

    var rightDot = svg.selectAll(".circle")
        .data(data);
        
    rightDot.enter()
        .append("circle")
        .attr("name", function(d) {
	        return d['Category']
	      })
        .attr("cx", function (d) { 
        	return rightScale(parseFloat(d['2011'])); 
        })
        .attr("cy", 80)
        .attr("r", 5)
        .style("fill", d3.rgb(255, 127, 14))
        .attr("transform", function(d, i) { return "translate(0," + i * lineHeight + ")"; })
        .on("mouseover", showtooltip2011)
    	.on("mouseout", hidetooltip);

		function showtooltip2001(d){
		  d3.select("#tooltip")

		  .html(
		          //"Year: 2001 <br/>" + 
		          numericalFormatter(d['2001'])
		  )
		  .style({
		      "display": "block",
		      "left": d3.event.pageX + "px",
		      "top": d3.event.pageY + "px"
		  })
		}

		function showtooltip2006(d){
		  d3.select("#tooltip")

		  .html(
		          //"Year: 2006 <br/>" + 
		          numericalFormatter(d['2006'])
		  )
		  .style({
		      "display": "block",
		      "left": d3.event.pageX + "px",
		      "top": d3.event.pageY + "px"
		  })
		}

		function showtooltip2011(d){
		  d3.select("#tooltip")

		  .html(
		          //"Year: 2011 <br/>" + 
		          numericalFormatter(d['2011'])
		  )
		  .style({
		      "display": "block",
		      "left": d3.event.pageX + "px",
		      "top": d3.event.pageY + "px"
		  })
		}

		function hidetooltip(){
		  d3.select("#tooltip")
		  .style("display", "none")
		}

    // ================= END DOTS ===================== //

	// ================= AXIS ===================== //

	var axis = d3.svg.axis()
		.scale(rightScale)
		.orient("top");

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, 40)")
		.call(axis);

	// ================= END AXIS ===================== //    
   

	// ================ BEGIN LABELS ================= //

	// label 2011 data
	// var rightLabels = svg.selectAll(".right-labels")
	// 	.data(data);
		
	// rightLabels.enter()
	// 	.append("text")
	// 	.attr("class","right-labels")
	// 	.attr("x", width - margin.right)
	// 	.attr("y", function(d) {
	// 		return rightScale(parseFloat(d['2011']));
	// 	})
	// 	.text(function (d) {
	// 		return numericalFormatter(d['2011']) + " " + d['Category'];
	// 	});

	// label 2006 data
	// var middleLabels = svg.selectAll(".middle-labels")
	// 	.data(data);
		
	// middleLabels.enter()
	// 	.append("text")
	// 	.attr("class","middle-labels")
	// 	.attr("x", width/2)
	// 	.attr("y", function(d) {
	// 		return middleScale(parseFloat(d['2006'])) + 4;
	// 	})
	// 	.text(function (d) {
	// 		return numericalFormatter(d['2006']);
	// 	});
	
	// label 2001 data
	var leftLabels = svg.selectAll(".left-labels")
		.data(data);
		
	leftLabels.enter()
		.append("text")
		.attr("class","left-labels")
		.attr("name", function(d) {
	        return d['Category']
	      })
		.attr("y", 85)
		.attr("x", function(d) {
			return leftScale(parseFloat(d['2001'])) - 10;
		})
		.text(function (d) {
			return d['Category'];
		})
		.attr("transform", function(d, i) { return "translate(0," + i * lineHeight + ")"; })
		.style("text-anchor", "end")
		.on("click", clickFocus)
		.on("mouseover", highlightMap)
      	.on("mouseout", unhighlightMap)
		});

		function highlightMap(d){
			//if(town_centers[i].node.style.fill == "#DDDDDD"){
		        if(d['Population'] == "Cloverdale"){
		          document.getElementById("cloverdale").style.display = "block";
		          town_centers[0].node.style.fill = "#aec7e8"; 
		        }
		        if(d['Population'] == "South Surrey"){
		          document.getElementById("south_surrey").style.display = "block";
		          town_centers[1].node.style.fill = "#aec7e8"; 
		        }
		        if(d['Population'] == "Guildford"){
		          document.getElementById("guildford").style.display = "block";
		          town_centers[2].node.style.fill = "#aec7e8"; 
		        }
				if((d['Population'] == "Whalley")){
		          document.getElementById("whalley").style.display = "block";
		          town_centers[3].node.style.fill = "#aec7e8"; 
		        }
		        if(d['Population'] == "Newton"){
		          document.getElementById("newton").style.display = "block";
		          town_centers[4].node.style.fill = "#aec7e8"; 
		        }
		        if(d['Population'] == "Fleetwood"){
		          document.getElementById("fleetwood").style.display = "block";
		          town_centers[5].node.style.fill = "#aec7e8"; 
		        }
		    //}
		}

		function unhighlightMap(d){
			//if(town_centers[i].node.style.fill != "#98df8a"){
				if((d['Population'] == "Cloverdale")){
		          document.getElementById("cloverdale").style.display = "none";
		          town_centers[0].node.style.fill = "#DDDDDD"; 
		        }
		        if(d['Population'] == "South Surrey"){
		          document.getElementById("south_surrey").style.display = "none";
		          town_centers[1].node.style.fill = "#DDDDDD"; 
		        }
		        if(d['Population'] == "Guildford"){
		          document.getElementById("guildford").style.display = "none";
		          town_centers[2].node.style.fill = "#DDDDDD"; 
		        }
				if((d['Population'] == "Whalley") && (town_centers[3].node.style.fill != "#2ca02c")){
		          document.getElementById("whalley").style.display = "none";
		          town_centers[3].node.style.fill = "#DDDDDD"; 
		        }
		        if(d['Population'] == "Newton"){
		          document.getElementById("newton").style.display = "none";
		          town_centers[4].node.style.fill = "#DDDDDD"; 
		        }
		        if(d['Population'] == "Fleetwood"){
		          document.getElementById("fleetwood").style.display = "none";
		          town_centers[5].node.style.fill = "#DDDDDD"; 
		        }
		    //}
		}
	
		function clickFocus(d){
			

		 //    var eles = [];
			// var inputs = document.getElementsByName("Fleetwood");
			// for(var i = 0; i < inputs.length; i++) {
			//     if(inputs[i].name.indexOf('q1_') == 0) {
			//         eles.push(inputs[i]);
			//     }
			// }
		}

	// ================ END LABELS ================= //

// function lineThicknessLeft(d){
// 	if (1 - (d["2001"] / d["2006"]) > 0.25) return "9";
	
// 	if ((1 - (d["2001"] / d["2006"]) < 0.24) && (1 - (d["2001"] / d["2006"]) > 0.15)) return "6";

// 	if ((1 - (d["2001"] / d["2006"]) < 0.14) && (1 - (d["2001"] / d["2006"]) > 0.05)) return "3";
	
// 	if (1 - (d["2001"] / d["2006"]) < 0.04) return "1";
// }

// function lineThicknessRight(d){
// 	if (1 - (d["2006"] / d["2011"]) > 0.25) return "9";
	
// 	if ((1 - (d["2006"] / d["2011"]) < 0.24) && (1 - (d["2006"] / d["2011"]) > 0.15)) return "6";

// 	if ((1 - (d["2006"] / d["2011"]) < 0.14) && (1 - (d["2006"] / d["2011"]) > 0.05)) return "3";
	
// 	if (1 - (d["2006"] / d["2011"]) < 0.04) return "1";
// }

// function lineColour(d){
// 	if(d["2011"] + d["2006"] + d["2001"] < 30000) return "black";
// 	if((d["2011"] + d["2006"] + d["2001"] >= 30000) && (d["2011"] + d["2006"] + d["2001"] <= 59999)) return "lightblue";
// 	if((d["2011"] + d["2006"] + d["2001"] >= 60000) && (d["2011"] + d["2006"] + d["2001"] <= 99999)) return "#9DB6FC";
// 	if((d["2011"] + d["2006"] + d["2001"] >= 10000) && (d["2011"] + d["2006"] + d["2001"] <= 129999)) return "#86A5FC";
// 	if(d["2011"] + d["2006"] + d["2001"] > 130000) return "#628CFC";
	
// }
