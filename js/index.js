mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsZGF0a2luIiwiYSI6ImNsOXp5aXZkYzBoczkzbm52OHg0eGhqNnIifQ.Ug97Lw6xGIT6N99_vvEb-A';

/*   creation of new map    */
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [25.19, 54.7],
  zoom: 10,
  pitch: 65,
  maxZoom: 15
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
  const el = document.createElement('div');

  el.className = 
    `marker ${feature
      .properties
      .description
      .toLowerCase()
      .replace(/\s+/g, '')}`;


  new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ 
        offset: 25,
        closeOnMove: true,
        closeButton: false,
        closeOnClick: true 
      })
      .setHTML(
        `<h3>saldatkin</h3><p>${feature.properties.description}</p>`
      )
  )
  .addTo(map);
}

map.addControl(new mapboxgl.NavigationControl())

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  };
}

map.on('load', () => {
  map.addLayer({
    id: 'points-of-interest',
    source: {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v8'
    },
    'source-layer': 'poi_label',
    type: 'circle',
    paint: {
      'circle-color': '#223b53',
    },
    layout: {
    // Mapbox Style Specification layout properties
    }
    });
});