mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsZGF0a2luIiwiYSI6ImNsOXp5aXZkYzBoczkzbm52OHg0eGhqNnIifQ.Ug97Lw6xGIT6N99_vvEb-A';


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
        form: 'tower',
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
        form: 'tower',
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
        form: 'area',
        description: 'Republic of Užupis'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.32070, 54.62176, ]
      },
      properties: {
        form: 'area',
        description: 'Republic of Užupis'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.38070, 54.64176, ]
      },
      properties: {
        form: 'area',
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
        form: 'castle',
        description: 'Trakai Castle'
      }
    }
  ]
};

const filterGroup = document.getElementById('filter-group');

map.on('load', () => {
  // Add a GeoJSON source containing place coordinates and information.
  map.addSource('places', {
  'type': 'geojson',
  'data': geojson
  });


  for (const feature of geojson.features) {
    const form = feature.properties.form;
    const el = document.createElement('div');

    el.className = 
      `marker 
      ${form} 
      ${feature
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

    
    // Add a layer for this symbol type if it hasn't been added already.
    if (!map.getLayer(form)) {
      map.addLayer({
        'id': form,
        'type': 'symbol',
        'source': 'places',
        'layout': {
        // These icons are a part of the Mapbox Light style.
        // To view all images available in a Mapbox style, open
        // the style in Mapbox Studio and click the "Images" tab.
        // To add a new image to the style at runtime see
        // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
          'icon-image': `music-15`,
          'icon-allow-overlap': true
        },
        'filter': ['==', 'icon', form]
      });
    
    // Add checkbox and label elements for the layer.
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = form;
    input.checked = true;
    filterGroup.appendChild(input);
    
    const label = document.createElement('label');
    label.setAttribute('for', form);
    label.textContent = form;
    filterGroup.appendChild(label);
    
    // When the checkbox changes, update the visibility of the layer.
    input.addEventListener('click', () => {

      document.querySelectorAll(`.${input.id}`)
            .forEach((el) => {
              console.log(el.className);
              el.classList.toggle('hidden')
            })
    })
  }
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
  })
})})
