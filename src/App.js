import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import items from "./data";
import Pin from "./Pin";

const token =
  "pk.eyJ1IjoiZ3NhbGxlcyIsImEiOiJjajl0OHZlaGcweWFzMzNqemUwMzRxeXpwIn0.RpgPgPCUEQv88iMEpMSGVA";

class App extends Component {
  state = {
    mapStyle: "mapbox://styles/mapbox/dark-v9",
    viewport: {
      latitude: 37.785164,
      longitude: -100,
      zoom: 3.5,
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

  _renderCityMarker = (item, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={item.longitude}
        latitude={item.latitude}
      >
        <Pin size={20} />
      </Marker>
    );
  };

  render() {
    const { viewport, mapStyle } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={token}
        onViewportChange={this._onViewportChange}
      >
        {items.map(this._renderCityMarker)}
      </ReactMapGL>
    );
  }
}

export default App;
