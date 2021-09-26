// const API_KEY = "xxxxxxxxxxxx";

$(document).ready(function() {
    // Creating our initial map object:
    // We set the longitude, latitude, and starting zoom level.
    // This gets inserted into the div with an id of "map".
    var myMap = L.map("map", {
        center: [32.7767, -96.7970],
        zoom: 13
    });

    // FROM QUICK START
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/satellite-v9',
        accessToken: API_KEY
    }).addTo(myMap);

    //create marker
    let marker = L.marker([32.7755, -96.8089])
    marker.bindPopup("<b>REUNION TOWER</b><br><hr><br>It changes patterns and colors at night.");

    // add to map
    marker.addTo(myMap);
});