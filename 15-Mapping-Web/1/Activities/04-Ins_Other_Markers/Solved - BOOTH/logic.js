$(document).ready(function() {
    // Create an initial map object
    // Set the longitude, latitude, and the starting zoom level
    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 13
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    }).addTo(myMap);


    // Create a new marker.
    L.marker([45.52, -122.67]).addTo(myMap);

    // Create a circle, and pass in some initial options.
    L.circle([45.52, -122.69], {
        color: "black",
        fillColor: "green",
        fillOpacity: 0.75,
        radius: 500
    }).addTo(myMap);

    // Create a Polygon, and pass in some initial options.
    L.polygon([
        [45.54, -122.68],
        [45.55, -122.68],
        [45.55, -122.66]
    ], {
        color: "black",
        fillColor: "yellow",
        fillOpacity: 0.75
    }).addTo(myMap);

    // The coordinates for each point to use in the polyline
    var line = [
        [45.51, -122.68],
        [45.50, -122.60],
        [45.48, -122.70],
        [45.54, -122.75]
    ];

    // Create a polyline by using the line coordinates, and pass in some initial options.
    L.polyline(line, {
        color: "red"
    }).addTo(myMap);

    // Create a rectangle, and pass in some initial options.
    L.rectangle([
        [45.55, -122.64],
        [45.54, -122.61]
    ], {
        color: "black",
        weight: 3,
        stroke: true
    }).addTo(myMap);
});