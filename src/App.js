import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import items from "./data";
import Pin from "./Pin";
import makeStyleMap from "./makeStyleMap";
import close from "./ic_close_black_24px.svg";
import youtube from "./youtube.svg";
import soundcloud from "./soundcloud.svg";
import twitter from "./twitter.svg";
import facebook from "./facebook.svg";
import defaultImage from "./Artboard Copy 4.png";

const mapStyle = makeStyleMap();

const token =
  "pk.eyJ1IjoiZ3NhbGxlcyIsImEiOiJjajl0OHZlaGcweWFzMzNqemUwMzRxeXpwIn0.RpgPgPCUEQv88iMEpMSGVA";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const artists = items.map(d => {
  var releases = [];
  if (d["Cover release 1"]) {
    releases.push({
      cover: d["Cover release 1"],
      link: d["Release 1"],
      name: d["Release Name 1"]
    });
  }
  if (d["Cover release 2"]) {
    releases.push({
      cover: d["Cover release 2"],
      link: d["Release 2"],
      name: d["Release Name 2"]
    });
  }
  if (d["Cover release 3"]) {
    releases.push({
      cover: d["Cover release 3"],
      link: d["Release 3"],
      name: d["Release Name 3"]
    });
  }
  return {
    name: d["Artist name"],
    latitude: d.Latitude,
    longitude: d.Longitude,
    releases: [],
    picture: d["Artist picture"] || defaultImage,
    cover:
      d["Cover release 1"] ||
      "http://illusion.scene360.com/wp-content/uploads/2014/10/computergraphics-album-covers-2014-03.jpg",
    streams: d["Streams"],
    downloads: d["Downloads"],
    releases: releases,
    genre: d["Genre"],
    description:
      d["Bio"] ||
      "Hardly anybody has brought electronic music from Berlin to the farthest flung corners of the world with more passion and enthusiasm than these two heavyweights."
  };
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function formatNumber(number) {
  if (number == null) {
    number = getRandomInt(100, 10000000);
  }

  if (number < 1000) {
    return number;
  }

  if (number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  }

  return (number / 1000000).toFixed(1) + "m";
}

function take(items, number) {
  const result = [];
  for (var i = 0; i < number; i++) {
    result.push(items[i]);
  }
  return result;
}

class App extends Component {
  state = {
    viewport: {
      latitude: 48.866667,
      longitude: 2.333333,
      zoom: 3.5,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    },
    selectedArtist: null,
    artistPanelIsOpen: false
  };

  _onViewportChange = viewport => this.setState({ viewport });

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    window.inter;
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  handlePinClick(artist) {
    this.setState({ artistPanelIsOpen: true, selectedArtist: artist });
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

  _renderArtistMarker = (item, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={item.longitude}
        latitude={item.latitude}
      >
        <Pin size={20} onClick={() => this.handlePinClick(item)} />
      </Marker>
    );
  };

  closeArtistPanel = () => {
    this.setState({ artistPanelIsOpen: null });
    setTimeout(() => {
      this.setState({ selectedArtist: null });
    }, 300);
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
        {artists.map(this._renderArtistMarker)}

        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl onViewportChange={this._onViewportChange} />
        </div>

        <div className="side-panel">
          <div className="subtitle">Stats</div>

          <div className="stat">
            <div className="stat-value">{formatNumber(12000)}</div>
            <div className="stat-title">Artists</div>
          </div>

          <div className="stat">
            <div className="stat-value">{formatNumber(3120000)}</div>
            <div className="stat-title">streams</div>
          </div>

          <div className="top-artists">
            <div className="subtitle">Top Artists</div>
            {take(artists, 5).map(artist => (
              <div className="artist-container">
                <div className="artist-name">{artist.name}</div>
                <div className="artist-streams">
                  {formatNumber(artist.streams)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="artist-panel"
          style={{
            transform: this.state.artistPanelIsOpen
              ? "translateX(0px)"
              : "translateX(540px)"
          }}
        >
          {this.state.selectedArtist && (
            <div>
              <button
                className="artist-panel-close"
                onClick={this.closeArtistPanel}
              >
                <img src={close} />
              </button>
              <div className="artist-cover-container">
                <img
                  className="artist-cover"
                  src={this.state.selectedArtist.cover}
                />
              </div>
              <img
                className="artist-picture"
                src={this.state.selectedArtist.picture}
              />
              <div className="artist-social">
                <img src={facebook} />
                <img src={twitter} />
                <img src={soundcloud} />
                <img src={youtube} />
              </div>
              <div className="artist-info">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <div className="artist-name">
                    {this.state.selectedArtist.name}
                  </div>
                  <div className="artist-genre">
                    {this.state.selectedArtist.genre}
                  </div>
                </div>
                <div className="artist-description">
                  {this.state.selectedArtist.description}
                </div>

                <div className="separator" />
                <div> {this.state.selectedArtist.location} </div>
                <div className="artist-stats">
                  <span className="artist-stats-title">Stream : </span>
                  {formatNumber(this.state.selectedArtist.streams)}
                  <span
                    className="artist-stats-title"
                    style={{ marginLeft: "10px" }}
                  >
                    Downloads : {" "}
                  </span>
                  {formatNumber(this.state.selectedArtist.downloads)}
                </div>

                <div
                  className="artist-stats-title"
                  style={{ margin: "10px 0" }}
                >
                  Releases{" "}
                </div>
                <div style={{ display: "flex" }}>
                  {this.state.selectedArtist.releases.map(release => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        className="release-cover"
                        src={release.cover}
                        onClick={() => window.open(release.link)}
                      />
                      <div style={{ marginTop: "5px" }}>{release.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ReactMapGL>
    );
  }
}

export default App;
