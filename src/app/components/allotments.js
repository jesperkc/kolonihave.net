"use client";

import React, { useEffect, useState } from "react";
//import axios from "axios";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import Link from "next/link";
import MapComponent from "./map";
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
// const MAPBOX_TOKEN = 'pk.eyJ1IjoiamVzcGVya2MiLCJhIjoiY2s4cWI4ejc5MDFwMjNlbzczOGRpMXF2ZyJ9.cbqRy5WOfV0gDwL-zgkeeg';

// const mapSettings = {
//   accessToken: MAPBOX_TOKEN,
//   maxZoom: 15,
//   minZoom: 6.5,
// };
// const Map = ReactMapboxGl({
//   accessToken: mapSettings.accessToken,
//   style: "mapbox://styles/mapbox/streets-v8",
//   maxZoom: mapSettings.maxZoom,
// });

const tempallotment = {
  _id: "fdsfsdsf",
  lat: 55.64262,
  lng: 12.18981,
};

export default () => {
  const [status, setStatus] = useState("loading");
  const [allotments, _allotments] = useState([tempallotment]);
  useEffect(() => {
    let canceled = false;
    if (status !== "loading") return;
    // axios("/api/get-allotments").then((result) => {
    //   if (canceled === true) return;

    //   if (result.status !== 200) {
    //     console.error("Error loading notes");
    //     console.error(result);
    //     return;
    //   }
    //  _allotments(result.data.notes);
    setStatus("loaded");
    //});

    return () => {
      canceled = true;
    };
  }, [status]);

  const onClickAllotment = (allotment) => {
    console.log("onClickAllotment", allotment);

    navigate(`/allotment/${allotment._id}`, {
      state: { modal: true },
    });
  };

  return (
    <MapComponent className="allotments-map">
      {/* <Map
				{...viewport}
				// maxBounds={[
				// 	[1, 53],
				// 	[22, 59],
				// ]}
				className='map'> */}
      {/* <ReactMapboxGlCluster data={kolonihaver} /> */}
      {/* <Layer
					type='circle'
					id='marker'
					paint={{
						'circle-color': '#ff5200',
						'circle-stroke-width': 1,
						'circle-stroke-color': '#fff',
						'circle-stroke-opacity': 1,
						'circle-radius': 10,
					}}>
					{allotments &&
						allotments.map(allotment => (
							<Feature
								coordinates={[allotment.lng, allotment.lat]}
								onClick={() => {
									onClickAllotment(allotment);
								}}
							/>
						))}
				</Layer> */}

      {allotments &&
        allotments.map((allotment) => (
          <Marker
            key={allotment._id}
            coordinates={[allotment.lng, allotment.lat]}
            anchor="bottom"
            onClick={() => {
              onClickAllotment(allotment);
            }}
          >
            <Link href={`/allotment/${allotment._id}`}>
              <div className="mapMarkerStyle" />
            </Link>
          </Marker>
        ))}
      {/* </Map> */}
    </MapComponent>
  );
};
