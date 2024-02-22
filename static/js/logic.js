let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.
function createMap(response){
console.log(response)
  // Create the tile layer that will be the background of our map.
  let streetMap = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


  // Create a baseMaps object to hold the lightmap layer.
let baseMaps={
 "street map":streetMap, 
 "Open TopoMap":OpenTopoMap
};
let bikeStations= createMarkers(response)//placeHolder
  // Create an overlayMaps object to hold the bikeStations layer.
let overlayMaps={
  "Bike Station": bikeStations
};
  // Create the map object with options.
let map= L.map("map-id", {
center:newYorkCoords,
zoom: mapZoomLevel,
layers: [streetMap, bikeStations]
});

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps,overlayMaps,{
collapsed:false
}).addTo(map);
}

// Create the createMarkers function.
function createMarkers(response){
  // Pull the "stations" property from response.data.
let stations =response.data.stations;
  // Initialize an array to hold the bike markers.
let bikeMarkers=[];
// var redMarker = L.ExtraMarkers.icon({
//   icon: 'fa-coffee',
//   markerColor: 'red',
//   shape: 'square',
//   prefix: 'fa'
// });
  // Loop through the stations array.
  stations.forEach(station =>{
     // For each station, create a marker, and bind a popup with the station's name.
     let stationMarker= L.marker([station.lat, station.lon])
     .bindPopup(`<h3>${station.name}</h3>`)
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(stationMarker);
  })
   
let bikeStationsMap= L.layerGroup(bikeMarkers);
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
return bikeStationsMap;
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
let url ="https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
d3.json(url).then(createMap)