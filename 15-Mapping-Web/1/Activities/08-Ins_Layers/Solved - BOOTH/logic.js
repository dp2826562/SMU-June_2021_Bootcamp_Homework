// An array of cities and their locations
var cities = [{
        name: "Paris",
        location: [48.8566, 2.3522]
    },
    {
        name: "Lyon",
        location: [45.7640, 4.8357]
    },
    {
        name: "Cannes",
        location: [43.5528, 7.0174]
    },
    {
        name: "Nantes",
        location: [47.2184, -1.5536]
    }
];

$(document).ready(function() {

    // An array that will store the created cityMarkers
    var cityMarkers = [];

    for (var i = 0; i < cities.length; i++) {
        let city = cities[i];

        // loop through the cities array, create a new marker, and push it to the cityMarkers array
        let marker = L.marker(city.location).bindPopup("<h1>" + city.name + "</h1>");
        cityMarkers.push(marker);
    }

    // Add all the cityMarkers to a new layer group.
    // Now, we can handle them as one group instead of referencing each one individually.
    var cityLayer = L.layerGroup(cityMarkers);

    // create base layers
    // FROM QUICK START
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

    // Only one base layer can be shown at a time.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer
    };

    // Overlays that can be toggled on or off
    var overlayMaps = {
        "Cities": cityLayer
    };

    //CREAT MAP WITH LAYERS MADE ABOVE


    // Create a map object, and set the default layers.
    var myMap = L.map("map", {
        center: [46.2276, 2.2137],
        zoom: 6,
        layers: [dark_layer, cityLayer]
    });

    // Pass our map layers into our layer control.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});