import React, { useState, useRef, useEffect } from "react";
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// const { token, styles } = {
// 	token: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
// 	styles: {
// 		londonCycle: 'mapbox://styles/mapbox/light-v9',
// 		light: 'mapbox://styles/mapbox/light-v9',
// 		dark: 'mapbox://styles/mapbox/dark-v9',
// 		basic: 'mapbox://styles/mapbox/basic-v9',
// 		outdoor: 'mapbox://styles/mapbox/outdoors-v10',
// 		streets: 'mapbox://styles/mapbox/streets-v8',
// 	},
// };
// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_TOKEN = "pk.eyJ1IjoiamVzcGVya2MiLCJhIjoiY2xwMzFrajBiMHkzbTJrcnBidmZnd3hwbiJ9.Z3Co33WPGMTPIQFX-at2UA";

// mapboxgl.accessToken = MAPBOX_TOKEN;
// mapboxgl.mapboxAccessToken = MAPBOX_TOKEN;
// mapboxgl.mapboxApiAccessToken = MAPBOX_TOKEN;
const mapSettings = {
  // style: "mapbox://styles/mapbox/streets-v12",
  style: "mapbox://styles/jesperkc/ck9brue8n0bej1ipm5k3p6f6f",
  accessToken: MAPBOX_TOKEN,
  maxZoom: 15,
  minZoom: 6.5,
};
const Map = ReactMapboxGl({
  style: mapSettings.style,
  accessToken: mapSettings.accessToken,
  maxZoom: mapSettings.maxZoom,
});

const MapComponent = ({ children, onLocationChange, lat, lng, zoom, className = "" }) => {
  const [viewport] = useState({
    center: [10.5, 56],
    zoom: [5],
    // zoom: [zoom || mapSettings.minZoom],
  });
  return (
    <div className={`map-container ${className}`}>
      <Map
        {...mapSettings}
        {...viewport}
        // onMoveEnd={onLocationChange}
        maxBounds={[
          [1, 53],
          [22, 59],
        ]}
        className="map"
      >
        <ZoomControl position={"bottom-right"} />
        {children}
      </Map>
    </div>
  );
};

export default MapComponent;
