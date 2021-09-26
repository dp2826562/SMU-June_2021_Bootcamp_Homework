// An array that contains all the information needed to create city and state markers
var locations = [{
        coordinates: [40.7128, -74.0059],
        state: {
            name: "New York State",
            population: 19795791
        },
        city: {
            name: "New York",
            population: 8550405
        }
    },
    {
        coordinates: [34.0522, -118.2437],
        state: {
            name: "California",
            population: 39250017
        },
        city: {
            name: "Lost Angeles",
            population: 3971883
        }
    },
    {
        coordinates: [41.8781, -87.6298],
        state: {
            name: "Michigan",
            population: 9928300
        },
        city: {
            name: "Chicago",
            population: 2720546
        }
    },
    {
        coordinates: [29.7604, -95.3698],
        state: {
            name: "Texas",
            population: 26960000
        },
        city: {
            name: "Houston",
            population: 2296224
        }
    },
    {
        coordinates: [41.2524, -95.9980],
        state: {
            name: "Nebraska",
            population: 1882000
        },
        city: {
            name: "Omaha",
            population: 446599
        }
    }
];

$(document).ready(function() {

    // Define arrays to hold the created city and state markers.
    var cityMarkers = [];
    var stateMarkers = [];

    // Loop through locations, and create the city and state markers.
    for (var i = 0; i < locations.length; i++) {
        // Set the marker radius for the state by passing the population to the markerSize() function.
        stateMarkers.push(
            L.circle(locations[i].coordinates, {
                stroke: false,
                fillOpacity: 0.75,
                color: "white",
                fillColor: "white",
                radius: markerSize(locations[i].state.population)
            }).bindPopup("<h1>" + locations[i].state.name + "</h1>")
        );

        // Set the marker radius for the city by passing the population to the markerSize() function.
        cityMarkers.push(
            L.circle(locations[i].coordinates, {
                stroke: false,
                fillOpacity: 0.75,
                color: "purple",
                fillColor: "purple",
                radius: markerSize(locations[i].city.population)
            }).bindPopup("<h1>" + locations[i].city.name + "</h1>")
        );
    }

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

    // Create two separate layer groups: one for the city markers and another for the state markers.
    var cityLayer = L.layerGroup(cityMarkers);
    var stateLayer = L.layerGroup(stateMarkers);

    // Create a baseMaps object to contain the streetmap and the darkmap.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer
    };

    // Create an overlayMaps object to contain the "State Population" and "City Population" layers
    var overlayMaps = {
        "Cities": cityLayer,
        "States": stateLayer
    };


    // Modify the map so that it has the streetmap, states, and cities layers
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [dark_layer, cityLayer]
    });

    // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});

// A function to determine the marker size based on the population
function markerSize(population) {
    return Math.sqrt(population) * 50;
}