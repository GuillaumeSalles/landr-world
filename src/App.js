import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactMapGL from "react-map-gl";

const token =
  "pk.eyJ1IjoiZ3NhbGxlcyIsImEiOiJjajl0OHZlaGcweWFzMzNqemUwMzRxeXpwIn0.RpgPgPCUEQv88iMEpMSGVA";

class App extends Component {
  state = {
    mapStyle: "mapbox://styles/mapbox/dark-v9",
    viewport: {
      latitude: 37.805,
      longitude: -122.447,
      zoom: 15.5,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    }
  };

  _onViewportChange = viewport => this.setState({ viewport });

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  render() {
    const { viewport, mapStyle } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={token}
        onViewportChange={this._onViewportChange}
      />
    );
  }
}

export default App;
