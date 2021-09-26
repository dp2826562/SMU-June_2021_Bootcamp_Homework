// global
var chosen_xaxis = "hair_length";

$(document).ready(function() {
    makePlot();

    //event listener
    $(window).resize(function() {
        makePlot();
    });
});

function makePlot() {

    // Import Data
    d3.csv("hairData2.csv").then(function(hairData) {

        // STEP 1: SET UP THE CANVAS
        $("#chart").empty();

        // var svgWidth = 960;
        var svgWidth = window.innerWidth;
        var svgHeight = 800;

        var margin = {
            top: 20,
            right: 40,
            bottom: 80,
            left: 100
        };

        var chart_width = svgWidth - margin.left - margin.right;
        var chart_height = svgHeight - margin.top - margin.bottom;

        // STEP 2: CREATE THE SVG (if it doesn't exist already)
        // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);


        // STEP 3: PREPARE THE DATA
        hairData.forEach(function(row) {
            row.hair_length = +row.hair_length;
            row.num_hits = +row.num_hits;
            row.num_albums = +row.num_albums;
        });

        // STEP 4: Create the Scales
        var xScale = createXScale(hairData, chart_width);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(hairData, d => d.num_hits)])
            .range([chart_height, 0]);


        // STEP 5: CREATE THE AXES
        var leftAxis = d3.axisLeft(yScale);
        var bottomAxis = d3.axisBottom(xScale);

        var xAxis = chartGroup.append("g")
            .attr("transform", `translate(0, ${chart_height})`)
            .call(bottomAxis);

        var yAxis = chartGroup.append("g")
            .call(leftAxis);

        // STEP 6: CREATE THE GRAPH
        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(hairData)
            .enter()
            .append("circle")
            .attr("r", "50")
            .attr("fill", "purple")
            .attr("stroke-width", "1")
            .attr("stroke", "black")
            .style("opacity", 0);

        // STEP 6.5: Be extra. Have the circles fly
        chartGroup.selectAll("circle")
            .transition()
            .duration(1000)
            .attr("cx", d => xScale(d[chosen_xaxis]))
            .attr("cy", d => yScale(d.num_hits))
            .attr("r", "10")
            .style("opacity", 1)
            .delay(function(d, i) { return i * 50 });


        // chartGroup.selectAll("circle")
        //     .transition()
        //     .duration(5000)
        //     .style("opacity", 1)
        //     .delay(function(d, i) { return i * 500 });

        // STEP 7: TOOLTIP
        circlesGroup = createTooltip(circlesGroup);

        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (chart_height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Number of Billboard 100 Hits");

        chartGroup.append("text")
            .attr("transform", `translate(${chart_width / 2}, ${chart_height + margin.top + 30})`)
            .attr("class", "axisText active")
            .attr("id", "hair_length")
            .text("Hair Metal Band Hair Length (inches)")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_xaxis = "hair_length";

                // update the x scale
                xScale = createXScale(hairData, chart_width);

                //update the x axis
                bottomAxis = d3.axisBottom(xScale);
                xAxis = createXAxis(xAxis, bottomAxis);

                // update the circles
                circlesGroup = updateCircles(circlesGroup, xScale);
                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#num_albums").classed("active", false);
                d3.select("#num_albums").classed("inactive", true);
            });

        //Add another text blob
        chartGroup.append("text")
            .attr("transform", `translate(${chart_width / 2}, ${chart_height + margin.top + 50})`)
            .attr("class", "axisText inactive")
            .attr("id", "num_albums")
            .text("Hair Metal Band Albums")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_xaxis = "num_albums";

                // update the x scale
                xScale = createXScale(hairData, chart_width);

                //update the x axis
                bottomAxis = d3.axisBottom(xScale);
                xAxis = createXAxis(xAxis, bottomAxis);

                // update the circles
                circlesGroup = updateCircles(circlesGroup, xScale);
                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#hair_length").classed("active", false);
                d3.select("#hair_length").classed("inactive", true);
            });


    }).catch(function(error) {
        console.log(error);
    });
}

function createXScale(hairData, chart_width) {
    var xScale = d3.scaleLinear()
        .domain(d3.extent(hairData, d => d[chosen_xaxis]))
        .range([0, chart_width]);

    return xScale;
}

function createXAxis(xAxis, bottomAxis) {
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

function updateCircles(circlesGroup, xScale) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => xScale(d[chosen_xaxis]));

    return circlesGroup;
}

function createTooltip(circlesGroup) {
    //step 0, get label
    var label = "";
    if (chosen_xaxis == "num_albums") {
        label = "No. Albums"
    } else {
        label = "Hair";
    }

    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`<strong>${d.rockband}<strong><hr><strong>${label}: ${d[chosen_xaxis]}, No. Hits: ${d.num_hits}</strong>`);
        });

    // Step 2: Create the tooltip in chartGroup.
    circlesGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(event, d) {
            toolTip.show(d, this);

            //make bubbles big
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", 100);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(event, d) {
            toolTip.hide(d);

            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", 10);
        });

    return circlesGroup; // this is important
}