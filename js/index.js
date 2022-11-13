mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsZGF0a2luIiwiYSI6ImNsOXp5aXZkYzBoczkzbm52OHg0eGhqNnIifQ.Ug97Lw6xGIT6N99_vvEb-A';

/*   creation of new map    */
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [25.25, 54.7],
  zoom: 10
});



const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.29070, 54.68676]
      },
      properties: {
        description: 'Gediminas Tower'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.21475,54.68717],
      },
      properties: {
        description: 'TV Tower'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.30070, 54.68176, ]
      },
      properties: {
        description: 'Republic of Užupis'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [24.9331594, 54.6522007,]
      },
      properties: {
        description: 'Trakai Castle'
      }
    }
  ]
};


for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>saldatkin</h3><p>${feature.properties.description}</p>`
      )
  )
  .addTo(map);
}