import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactMapGL from "react-map-gl";

const token =
  "pk.eyJ1IjoiZ3NhbGxlcyIsImEiOiJjajl0OHZlaGcweWFzMzNqemUwMzRxeXpwIn0.RpgPgPCUEQv88iMEpMSGVA";

class App extends Component {
  render() {
    return (
      <ReactMapGL
        width={window.innerWidth}
        height={window.innerHeight}
        latitude={37.805}
        longitude={-122.447}
        zoom={8}
        mapboxApiAccessToken={token}
        onViewportChange={viewport => {
          const { width, height, latitude, longitude, zoom } = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
      />
    );
  }
}

export default App;
