// Dataset we will be using to set the height of our rectangles
var booksReadThisYear = [17, 23, 20, 34];

// init the canvas
var svg_width = 400;
var svg_height = 400;

// BUILD THE CANVAS
var svg = d3.select("#svg-area")
    .append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height);

svg.selectAll("rect")
    .data(booksReadThisYear)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * 60;
    })
    .attr("y", function(d) {
        return svg_height - (d * 10)
    })
    .attr("width", 50)
    .attr("height", function(d) {
        return d * 10;
    })
    .attr("fill", "red");



/* <rect x="0" y="0" width="50" height="50" fill="green" /> */


// Append an SVG wrapper to the page and set a variable equal to a reference to it
// YOUR CODE HERE

// Vertical Bar Chart
// YOUR CODE HERE

// BONUS
// Horizontal Bar Chart
// YOUR CODE HERE
// svg.selectAll("rect")
//     .data(booksReadThisYear)
//     .enter()
//     .append("rect")
//     .attr("y", function(d, i) {
//         return i * 60;
//     })
//     .attr("x", 50)
//     .attr("height", 50)
//     .attr("width", function(d) {
//         return d * 10;
//     })
//     .attr("fill", "red");

// BONUS 2
// Alter your Vertical bar chart code to go from bottom  up.