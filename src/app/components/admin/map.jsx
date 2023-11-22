import React from "react";
import ReactDOM from "react-dom";
import MapComponent from "../map";
import MapAllotments from "../map/map-allotments";
import MapHouse from "../map/map-house";
// import 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.css';

import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import kolonihavehouseforenings from "../../data/kolonihaver.json";

// tslint:disable-next-line:no-var-requires
const { token, styles } = {
  token: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
  styles: {
    londonCycle: "mapbox://styles/mapbox/light-v9",
    light: "mapbox://styles/mapbox/light-v9",
    dark: "mapbox://styles/mapbox/dark-v9",
    basic: "mapbox://styles/mapbox/basic-v9",
    outdoor: "mapbox://styles/mapbox/outdoors-v10",
    streets: "mapbox://styles/mapbox/streets-v8",
  },
};

const mapboxglaccessToken = "pk.eyJ1IjoiamVzcGVya2MiLCJhIjoiY2s4cWI4ejc5MDFwMjNlbzczOGRpMXF2ZyJ9.cbqRy5WOfV0gDwL-zgkeeg";

const Map = ReactMapboxGl({ accessToken: mapboxglaccessToken });

class EditMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: props.lng || 10.6,
      lat: props.lat || 56.2,
      locked: props.lng || props.lat ? true : false,
    };

    this.onLocationChange = this.onLocationChange.bind(this);
    this.unlockMap = this.unlockMap.bind(this);
  }

  componentDidMount() {}
  onClickCircle = (evt) => {
    this.setState({ ...evt.lngLat });
  };
  onLocationChange(map, evt) {
    const latlng = map.getCenter();
    this.setState({ ...latlng });
  }

  unlockMap() {
    this.setState({ locked: false });
  }

  render() {
    const { locked, lat, lng, zoom } = this.state;
    return (
      <div>
        {/* <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet' /> */}
        <div className="map-container">
          {locked && <div className="map-locked" onClick={this.unlockMap}></div>}

          <MapComponent onLocationChange={this.onLocationChange} {...this.state}>
            <MapHouse />
            <MapAllotments />
          </MapComponent>
        </div>
      </div>
    );
  }
}

export default EditMapComponent;

// https://placeholder.demo.geocode.earth/parser/search?text=frederiksberg&mode=live&lang=dan
// https://placeholder.demo.geocode.earth/demo/#eng
// https://github.com/dobrud/typed-mapbox-gl/blob/master/mapbox-gl.d.ts
