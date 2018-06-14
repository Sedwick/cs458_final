//Scaling  variables for planets and satellites
//(Planet scaling is larger and will result in smaller depiction as variables will be used for dividing)
var planet_scale = 1250;
var satellite_scale = 90;

//Distance between each satellite and planet
var planet_offset = 250;
var sun_offset = 380;

//Offset for line used to show connection to each planet
var planet_line_offset = 70;
var satellite_line_offset = 40;
var line_len = 90;

//Offset for text used in object labeling
var text_offset = 30;

//Setting up canvas for d3 to draw on and append shapes
var canvas = d3.select("body").append("svg")
			.attr("width", 2500)
			.attr("height", 2000)


//Used as a temp variable for placing satellites on the map.
var lastPlanet = "";

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])

tip.direction("s");
canvas.call(tip);


/* For the drop shadow filter... */
var defs = canvas.append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur")
    filter.append("feFlood")
        .attr("in", "offsetBlur")
        .attr("flood-color", "#ffff66")
        .attr("flood-opacity", "0.5")
        .attr("result", "offsetColor");
    filter.append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

//Read in planet_data.json and draw planets to canvas.
d3.json("planet_data.json", function (data) {

		canvas.selectAll("rect")
			.data(data)
			.enter()
				.append("a")
				.attr("xlink:href", function(d) {
					switch(d.Planet) {
						case "Mercury":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/mercury.html";
						case "Venus":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/venus.html";
						case "Earth":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/earth.html";
						case "Mars":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/mars.html";
						case "Jupiter":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/jupiter.html";
						case "Saturn":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/saturn.html";
						case "Uranus":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/uranus.html";
						case "Neptune":
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/neptune.html";
						default:
							return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/planet.html";
							break;
					}
				})
				.append("circle")
				.attr("cx", function(d, i) { return i * planet_offset + sun_offset;  })//+ d.Orbit_Circumference/(2*3.14159*2770000);})
				.attr("cy", 250)
				.attr("r", function(d) { return d.Mean_Radius/planet_scale; })
				.attr("fill", function(d) { return d.Color; })
				.attr("filter", "url(#dropshadow)")
				.on("mouseover", function(d) {

				switch(d.Planet) {
					case "Mercury":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					case "Venus":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					case "Earth":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					case "Mars":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					case "Jupiter":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					case "Saturn":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					case "Uranus":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					case "Neptune":
						tiptext = "Orbit Around the Sun: " + d.Orbit + "<br>Mass: " + d.Mass + "<br>Length of Day: " + d.DayLength + "<br>Length of Year: " + d.YearLength + "<br>Atmospheric Constituents: " + d.Atmosphere + "<br>Click planet to see " + d.Planet + " in motion!";
						break;
					default:
						tiptext = "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/planet.html";
						break;
				}
				tip.html(tiptext);
				tip.show();
				})
				.on("mouseout", tip.hide);


	//Drawing the sun.
	canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("circle")
			.attr("cx", -70)
			.attr("cy", 250)
			.attr("r", 250)
			.attr("fill","yellow")
			.attr("filter", "url(#dropshadow)");

	//Drawing label line (not used)
	canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("line")
			.attr("x1", function(d, i) { return i * planet_offset + sun_offset; })
			.attr("y1", 250 - planet_line_offset)
			.attr("x2", function(d, i) { return i * planet_offset + sun_offset; })
			.attr("y2", 250 - line_len)
			.attr("stroke-width", 2)
			.attr("stroke", "black");

	//Drawing labels for each respective planet.
	canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("text")
			.attr("x", function(d, i) { return i * planet_offset + sun_offset - 25; })
			.attr("y", 250 - line_len - text_offset)
			.text( function (d) { return d.Planet; })
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "red");
});

//Read in satellite_data.json and draw planets to canvas.
d3.json("satellite_data.json", function (data) {
	var counter = 0;
	console.log(d3.entries(data));

	canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("a")
			.attr("xlink:href", function(d) {
				switch(d.Satellite) {
					case "Moon":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/moon.html";
					case "Io":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/io.html";
					case "Europa":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/europa.html";
					case "Ganymede":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/ganymede.html";
					case "Callisto":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/callisto.html";
					case "Mimas":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/mimas.html";
					case "Enceladus":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/enceladus.html";
					case "Tethys":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/tethys.html";
					case "Dione":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/dione.html";
					case "Rhea":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/rhea.html";
					case "Titan":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/titan.html";
					case "Iapetus":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/iapetus.html";
					case "Miranda":
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/miranda.html";
					default:
						return "http://web.engr.oregonstate.edu/~kabirt/cs458/cs458_WebGL/planet.html";
						break;
				}
			})
			.append("circle")
			.attr("cx", function(d, i) {

				switch(d.Planet) {
					case "Mercury":
						return 0 * planet_offset + sun_offset;
					case "Venus":
						return 1 * planet_offset + sun_offset;
					case "Earth":
						return 2 * planet_offset + sun_offset;
					case "Mars":
						return 3 * planet_offset + sun_offset;
					case "Jupiter":
						return 4 * planet_offset + sun_offset;
					case "Saturn":
						return 5 * planet_offset + sun_offset;
					case "Uranus":
						return 6 * planet_offset + sun_offset;
					case "Neptune":
						return 7 * planet_offset + sun_offset;
					default:
						return i * planet_offset + sun_offset;
						break;
				}
			})
			.attr("cy", function(d, i) {

				if(lastPlanet === d.Planet){
					counter = counter + 1;
					lastPlanet = d.Planet;
					return 500 + 100 * counter;
				}else{
					counter = 0;
					lastPlanet = d.Planet;
					return 500 + 100 * counter;
				}
			})
			.attr("r", function(d){ return parseFloat(d.Mean_Radius/satellite_scale); })
			.attr("fill", function(d) { return d.Color; });

	//Draw label lines
	/*canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("arrow")
			.attr("x1", function(d, i) {

				switch(d.Planet) {
					case "Mercury":
						return 0 * planet_offset + sun_offset + planet_line_offset;
					case "Venus":
						return 1 * planet_offset + sun_offset + planet_line_offset;
					case "Earth":
						return 2 * planet_offset + sun_offset + planet_line_offset;
					case "Mars":
						return 3 * planet_offset + sun_offset + planet_line_offset;
					case "Jupiter":
						return 4 * planet_offset + sun_offset + planet_line_offset;
					case "Saturn":
						return 5 * planet_offset + sun_offset + planet_line_offset;
					case "Uranus":
						return 6 * planet_offset + sun_offset + planet_line_offset;
					case "Neptune":
						return 7 * planet_offset + sun_offset + planet_line_offset;
					default:
						return i * planet_offset + sun_offset + planet_line_offset;
						break;
				}
			})
			.attr("y1", function(d, i) {

				if(lastPlanet === d.Planet){
					counter = counter + 1;
					lastPlanet = d.Planet;
					return 500 + 100 * counter;
				}else{
					counter = 0;
					lastPlanet = d.Planet;
					return 500 + 100 * counter;
				}
			})
			.attr("x2", function(d, i) {

				switch(d.Planet) {
					case "Mercury":
						return 0 * planet_offset + sun_offset + line_len;
					case "Venus":
						return 1 * planet_offset + sun_offset + line_len;
					case "Earth":
						return 2 * planet_offset + sun_offset + line_len;
					case "Mars":
						return 3 * planet_offset + sun_offset + line_len;
					case "Jupiter":
						return 4 * planet_offset + sun_offset + line_len;
					case "Saturn":
						return 5 * planet_offset + sun_offset + line_len;
					case "Uranus":
						return 6 * planet_offset + sun_offset + line_len;
					case "Neptune":
						return 7 * planet_offset + sun_offset + line_len;
					default:
						return i * planet_offset + sun_offset + line_len;
						break;
				}
			})
			.attr("y2", function(d, i) {

				if(lastPlanet === d.Planet){
					counter = counter + 1;
					lastPlanet = d.Planet;
					return 500 + 100 * counter;
				}else{
					counter = 0;
					lastPlanet = d.Planet;
					return 500 + 100 * counter;
				}
			})
			.attr("stroke-width", 2)
			.attr("stroke", "black");
	*/

	//Drawing labels for each respective satellite.
	canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("text")
			.attr("x", function(d, i) {

				switch(d.Planet) {
					case "Mercury":
						return 0 * planet_offset + sun_offset + satellite_line_offset;
					case "Venus":
						return 1 * planet_offset + sun_offset + satellite_line_offset;
					case "Earth":
						return 2 * planet_offset + sun_offset + satellite_line_offset;
					case "Mars":
						return 3 * planet_offset + sun_offset + satellite_line_offset;
					case "Jupiter":
						return 4 * planet_offset + sun_offset + satellite_line_offset;
					case "Saturn":
						return 5 * planet_offset + sun_offset + satellite_line_offset;
					case "Uranus":
						return 6 * planet_offset + sun_offset + satellite_line_offset;
					case "Neptune":
						return 7 * planet_offset + sun_offset + satellite_line_offset;
					default:
						return i * planet_offset + sun_offset + satellite_line_offset;
						break;
				}
			})
			.attr("y", function(d, i) {

				if(lastPlanet === d.Planet){
					counter = counter + 1;
					lastPlanet = d.Planet;
					return 505 + 100 * counter;
				}else{
					counter = 0;
					lastPlanet = d.Planet;
					return 505 + 100 * counter;
				}
			})
			.text( function (d) { return d.Satellite; })
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "red");
});
