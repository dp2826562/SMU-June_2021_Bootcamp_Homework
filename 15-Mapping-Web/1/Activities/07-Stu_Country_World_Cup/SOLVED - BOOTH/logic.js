// Country data
var countries = [{
        name: "Brazil",
        location: [-14.2350, -51.9253],
        points: 227
    },
    {
        name: "Germany",
        location: [51.1657, 10.4515],
        points: 218
    },
    {
        name: "Italy",
        location: [41.8719, 12.5675],
        points: 156
    },
    {
        name: "Argentina",
        location: [-38.4161, -63.6167],
        points: 140
    },
    {
        name: "Spain",
        location: [40.4637, -3.7492],
        points: 99
    },
    {
        name: "England",
        location: [52.355, 1.1743],
        points: 98
    },
    {
        name: "France",
        location: [46.2276, 2.2137],
        points: 96
    },
    {
        name: "Netherlands",
        location: [52.1326, 5.2913],
        points: 93
    },
    {
        name: "Uruguay",
        location: [-32.4228, -55.7658],
        points: 72
    },
    {
        name: "Sweden",
        location: [60.1282, 18.6435],
        points: 61
    }
];

// document ready
$(document).ready(function() {
    // Create a map object.
    var myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3
    });

    // FROM QUICK START
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    }).addTo(myMap);

    // Loop through the countries array.

    // Add circles to the map
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];

        // create the marker
        L.circle(country.location, {
            fillOpacity: 0.75,
            color: makeColor(country.points),
            fillColor: makeColor(country.points),
            // Setting our circle's radius to equal the output of our markerSize() function:
            // This will make our marker's size proportionate to its population.
            radius: makeRadius(country.points)
        }).bindPopup(`<h1>${country.name}</h1> <hr> <h3>Points: ${country.points.toLocaleString()}</h3>`).addTo(myMap);
    }
});

// HELPER FUNCTION FOR RADIUS
function makeRadius(points) {
    // Adjust the radius
    return points * 1000;
}

// HELPER FUNCTION FOR COLOR
function makeColor(points) {
    let rtnColor = "red";

    // Conditionals for country points
    if (points > 200) {
        rtnColor = "yellow";
    } else if (points > 100) {
        rtnColor = "blue";
    } else if (points > 90) {
        rtnColor = "green";
    } else {
        rtnColor = "red";
    }

    return rtnColor;
}