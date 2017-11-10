import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import items from "./data";
import Pin from "./Pin";
import makeStyleMap from "./makeStyleMap";

const mapStyle = makeStyleMap();

const token =
  "pk.eyJ1IjoiZ3NhbGxlcyIsImEiOiJjajl0OHZlaGcweWFzMzNqemUwMzRxeXpwIn0.RpgPgPCUEQv88iMEpMSGVA";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const artists = [
  { name: "Marvin Beker", streams: 55878 },
  { name: "Marvin Beker", streams: 55878 },
  { name: "Marvin Beker", streams: 55878 },
  { name: "Marvin Beker", streams: 55878 },
  { name: "Marvin Beker", streams: 55878 }
];

class App extends Component {
  state = {
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

  handlePinClick() {
    return;
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
        <Pin size={20} onClick={this.handlePinClick} />
      </Marker>
    );
  };

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={token}
        onViewportChange={this._onViewportChange}
      >
        {items.map(this._renderCityMarker)}

        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl onViewportChange={this._onViewportChange} />
        </div>

        <div className="side-panel">
          <div className="subtitle">Stats</div>

          <div className="stat">
            <div className="stat-value">11K</div>
            <div className="stat-title">Artists</div>
          </div>

          <div className="stat">
            <div className="stat-value">13.2M</div>
            <div className="stat-title">streams</div>
          </div>

          <div className="top-artists">
            <div className="subtitle">Top Artists</div>
            {artists.map(artist => (
              <div className="artist-container">
                <div className="artist-name">{artist.name}</div>
                <div className="artist-streams">{artist.streams}</div>
              </div>
            ))}
          </div>
        </div>
      </ReactMapGL>
    );
  }
}

export default App;
