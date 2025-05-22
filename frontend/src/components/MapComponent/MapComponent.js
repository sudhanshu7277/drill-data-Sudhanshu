import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-providers';

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ filteredDrillholes }) => {
  const [activeBasemap, setActiveBasemap] = useState('OpenStreetMap');
  const basemapsConfig = {
    OpenStreetMap: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    EsriWorldImagery: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19
    },
    CartoDBPositron: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>',
      maxZoom: 19
    },
    StadiaAlidadeSmoothDark: {
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenStreetMap</a> contributors'
    },
    // Example of using a provider string with L.tileLayer.provider to get its URL/attribution
    // This is useful if you want to rely on leaflet-providers for the exact URL/attribution
    // Note: You need to instantiate it once to get its properties.
    // However, for React-Leaflet's TileLayer, we just need the URL string itself.
    // L.tileLayer.provider() *returns* a Leaflet layer object, not just a URL.
    // So, if you want to use it, you'd do:
    // const stamenTonerLayer = L.tileLayer.provider('Stamen.Toner');
    // then get stamenTonerLayer.options.url and stamenTonerLayer.options.attribution
    // but the simplest is just to hardcode the common ones or use the provided API correctly.
    // For now, let's keep it simple with direct URLs.
    // 'Stamen Toner': {
    //   url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
    //   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   maxZoom: 19
    // }
  };

  // Function to get marker style based on Total depth
  const getMarkerStyle = (feature) => {
    const totalDepth = feature.properties['Total depth'];
    let fillColor = '#3388ff'; // Default blue
    if (totalDepth !== null) {
      if (totalDepth < 300) {
        fillColor = '#28a745'; // Green for shallow
      } else if (totalDepth >= 300 && totalDepth < 700) {
        fillColor = '#ffc107'; // Yellow/Orange for medium
      } else {
        fillColor = '#dc3545'; // Red for deep
      }
    }
    return {
      radius: 8,
      fillColor: fillColor,
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
  };

  const onEachFeature = (feature, layer) => {
    let popupContent = `<strong>Hole ID:</strong> ${feature.properties.Hole_ID}<br/>`;
    for (const key in feature.properties) {
      if (feature.properties[key] !== null && feature.properties[key] !== undefined && key !== 'Hole_ID') {
        popupContent += `<strong>${key}:</strong> ${feature.properties[key]}<br/>`;
      }
    }
    layer.bindPopup(popupContent);
  };

  return (
    <MapContainer
      center={[32.75, -110.47]} // Centered roughly on your data
      zoom={12}
      style={{ height: '100vh', width: '70vw', float: 'left' }}
      // zoomControl={false} // Removed this, as LayersControl doesn't replace zoomControl
    >
      <LayersControl position="topright">
        {Object.entries(basemapsConfig).map(([name, config]) => (
          <LayersControl.BaseLayer checked={name === activeBasemap} name={name} key={name}>
            <TileLayer
              url={config.url}
              attribution={config.attribution}
              maxZoom={config.maxZoom}
            />
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>

      <GeoJSON
        key={JSON.stringify(filteredDrillholes)} // Key to force re-render when data changes
        data={filteredDrillholes}
        pointToLayer={(feature, latlng) => {
          return L.circleMarker(latlng, getMarkerStyle(feature));
        }}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default MapComponent;