mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsZGF0a2luIiwiYSI6ImNsOXp5aXZkYzBoczkzbm52OHg0eGhqNnIifQ.Ug97Lw6xGIT6N99_vvEb-A';

/*   creation of new map    */
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://streets',
  center: [-96, 37.8],
  zoom: 3
});


const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
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
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      )
  )
  .addTo(map);
}



  