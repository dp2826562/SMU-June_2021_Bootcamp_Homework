// Use this link to get the GeoJSON data.
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";

// Timeframe 
var timeframe = "all_week.geojson";

// build the URL
var earthquakes_url = baseURL + timeframe;

// geojson
var plates_URL = "static/data/PB2002_boundaries.json";


$(document).ready(function() {
    // get data
    // AJAX
    $.ajax({
        type: "GET",
        url: earthquakes_url,
        contentType: "application/json",
        dataType: "json",
        success: function(earthquakes_data) {
            $.ajax({
                type: "GET",
                url: plates_URL,
                contentType: "application/json",
                dataType: "json",
                success: function(plate_data) {
                    console.log(earthquakes_data);
                    console.log(plate_data);
                    makeMap(earthquakes_data, plate_data);

                },
                error: function(data) {
                    console.log("YOU BROKE IT!!");
                },
                complete: function(data) {
                    console.log("Request finished");
                }
            });


        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
});

function makeMap(earthquakes_data, plates_data) {
    // Create the base layers.
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });

    // Create a baseMaps object to contain the streetmap and the darkmap.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer
    };

    // DO WORK AND CREATE THE OVERLAY LAYERS
    let features = earthquakes_data.features;
    let geoLayer = L.geoJSON(features, {
        onEachFeature: onEachFeature
    });

    // make a loop for heat array and marker clusters 
    var earthqMarkers = L.markerClusterGroup();
    var heatArray = [];
    var circleArray = [];
    for (var i = 0; i < features.length; i++) {
        var location = features[i].geometry;



        if (location) {
            // add heat map data
            heatArray.push([location.coordinates[1], location.coordinates[0]]);
        
            let marker = L.marker([location.coordinates[1], location.coordinates[0]]);
            marker.bindPopup(`<h3>$([features[i].properties.place} Mag: $ {features.properties.mag} $</h><h><p>${new Date(features[i].properties.time)}</p>`);
            earthqMarkers.addLayer(marker);

            // create the marker
            let circle = L.circle([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            color: makeColor(location.coordinates[2]),
            fillColor: makeColor(location.coordinates[2]),
            // Setting our circle's radius to equal the output of our markerSize() function:
            // This will make our marker's size proportionate to its population.
            radius: makeRadius(features[i].properties.mag)}).
            bindPopup(`<h3>$([features[i].properties.place} Mag: $ {features.properties.mag} $</h><h><p>${new Date(features[i].properties.time)}</p>`);
            circleArray.push(circle);
        };

       
        
    }
////////////////layer group for circles 
    var circleLayer = L.layerGroup(circleArray);

///////// heatmap
    var heatLayer = L.heatLayer(heatArray, {
        radius: 30,
        blur: 10
    });

////////create an overlay MAP object to contain the state population and city population 
var overlayMAPS = {
    "Earth Quake Layers": earthqMarkers,
    "Earth Quakes": geoLayer, 
    "Heatmap": heatLayer,
    "Circles": circleLayer
}
// Modify the map so that it has the streetmap, states, and cities layers
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5,
    layers: [dark_layer, earthqMarkers, circleLayer]
});

 // Create a layer for baseMaps and overlayMaps
 L.control.layers(baseMaps).addTo(myMap);


 // Helper Function
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>$([feature.properties.place) Mag: $ {feature.properties.mag} </h><h><p>${new Date(feature.properties.time)}</p>`);
}

// HELPER FUNCTION FOR RADIUS
function makeRadius(points) {
    // Adjust the radius
    return points * 10000;
}

// HELPER FUNCTION FOR COLOR
function makeColor(magnitude) {
    let rtnColor = "red";

    // Conditionals for magnitude
    if (magnitude > 5) {
        rtnColor = "yellow";
    } else if (magnitude > 3) {
        rtnColor = "blue";
    } else if (magnitude > 1) {
        rtnColor = "green";
    } else {
        rtnColor = "red";
    }

    return rtnColor;
}





}