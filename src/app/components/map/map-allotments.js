import React from "react";
import { GeoJSONLayer } from "react-mapbox-gl";
import kolonihavehouseforenings from "../../data/kolonihaver.json";

export const defaultMapAllotments = () => {
  return (
    <>
      <GeoJSONLayer data={kolonihavehouseforenings} fillLayout={fillLayout} fillPaint={fillPaint} linePaint={linePaint} />
      <GeoJSONLayer data={kolonihavehouseforenings} symbolLayout={symbolLayout} symbolPaint={symbolPaint} />
    </>
  );
};

const fillLayout = { visibility: "visible" };
const fillPaint = {
  "fill-color": "red",
  "fill-opacity": ["interpolate", ["linear"], ["zoom"], 10, 1, 13, 0.1],
};

const linePaint = {
  "line-opacity": 1,
  "line-color": "red",
  "line-width": ["interpolate", ["linear"], ["zoom"], 10, 3, 13, 1],
};

const symbolLayout = {
  "text-field": "{name}",
  "text-font": ["Open Sans Regular", "Arial Unicode MS Bold"],
  "text-size": 14,
  "text-offset": [0, 0.6],
  "text-anchor": "top",
};
const symbolPaint = {
  "text-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0, 11, 1],
  "text-color": "#333333",
  "text-halo-color": "white",
  "text-halo-width": 1,
  "text-halo-blur": 0,
};
