import React, { Component } from "react";
import logo from "./logo.svg";
import pin from "./Pin.svg";
import "./MyFontsWebfontsKit.css";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import close from "./ic_close_black_24px.svg";
import youtube from "./youtube.svg";
import soundcloud from "./soundcloud.svg";
import twitter from "./twitter.svg";
import facebook from "./facebook.svg";
import ReactMapboxGl, {
  Layer,
  Feature,
  Marker,
  Cluster
} from "react-mapbox-gl";
import artists from "./artists";
import formatNumber from "./formatNumber";
import ArtistsList from "./ArtistsList";

const artistsArray = Array.from(artists.values());
const topFiveArtists = [
  artists.get("868d4fa7-dfaf-4d3f-ae3d-5f6e598f94bc"),
  artists.get("b042f1cb-0b7f-4dc5-88e4-e4f285633b64"),
  artists.get("62d1df32-315c-4732-b3b4-1551a99ec342"),
  artists.get("ceba79c7-6f34-4647-98fa-0526cfefb60c"),
  artists.get("6c30ae88-4a14-416e-a341-6d3185ec813b")
];

const token =
  "pk.eyJ1IjoiZ3NhbGxlcyIsImEiOiJjajl0OHZlaGcweWFzMzNqemUwMzRxeXpwIn0.RpgPgPCUEQv88iMEpMSGVA";

const Map = ReactMapboxGl({
  accessToken: token
});

function take(items, number) {
  const result = [];
  for (var i = 0; i < number; i++) {
    result.push(items[number]);
  }
  return result;
}

function clusterSize(nbOfPoints) {
  return Math.min(30 + nbOfPoints * 5, 70);
}

function getCenter(state) {
  if (state.selectedArtist) {
    return [state.selectedArtist.longitude, state.selectedArtist.latitude];
  }

  if (state.selectedArtists) {
    const firstArtist = artists.get(state.selectedArtists[0]);
    return [firstArtist.longitude, firstArtist.latitude];
  }

  return [2.333333, 48.866667];
}

class App extends Component {
  state = {
    selectedArtist: null,
    artistPanelIsOpen: false,
    selectedArtists: null
  };

  handlePinClick(artist) {
    this.setState({
      artistPanelIsOpen: true,
      selectedArtist: artist,
      selectedArtists: null
    });
  }

  _renderArtistMarker = (item, index) => {
    return (
      <Marker
        key={item.id}
        coordinates={[item.longitude, item.latitude]}
        onClick={() => this.handlePinClick(item)}
      >
        <img src={pin} />
      </Marker>
    );
  };

  closeArtistPanel = () => {
    this.setState({ artistPanelIsOpen: false });
    setTimeout(() => {
      this.setState({ selectedArtist: null, selectedArtists: null });
    }, 300);
  };

  clusterMarker = (coordinates, pointCount, getLeaves) => (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={{
        width: clusterSize(pointCount),
        height: clusterSize(pointCount),
        borderRadius: "50%",
        backgroundColor: "#84E0E0",
        opacity: 0.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        cursor: "pointer"
      }}
      onClick={() => {
        this.setState({
          selectedArtists: getLeaves().map(l => l.key),
          selectedArtist: null,
          artistPanelIsOpen: true
        });
      }}
    />
  );

  render() {
    const { viewport } = this.state;
    return (
      <div>
        <svg
          style={{
            position: "absolute",
            left: "36px",
            top: "42px",
            zIndex: 2,
            color: "white"
          }}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>icn-logo_landr-30</title>
          <g
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            fillRule="evenodd"
          >
            <path d="M26.75 18c0 6.628-5.372 12-12 12s-12-5.372-12-12 5.372-12 12-12 12 5.372 12 12z" />
            <path d="M33.25 18c0 6.628-5.372 12-12 12s-12-5.372-12-12 5.372-12 12-12 12 5.372 12 12z" />
          </g>
        </svg>
        <div className="side-panel">
          <div className="stat">
            <div className="stat-value">{formatNumber(13200000)}</div>
            <div className="stat-title">Artists</div>
          </div>

          <div className="stat">
            <div className="stat-value">{formatNumber(65700000)}</div>
            <div className="stat-title">Streams</div>
          </div>

          <div className="top-artists">
            <div className="subtitle">Top Artists</div>
            {topFiveArtists.map(artist => (
              <div className="artist-container">
                <div className="artist-name">{artist.name}</div>
                <div className="artist-streams">{artist.streams}</div>
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
          {this.state.selectedArtists && (
            <div>
              <button
                className="artist-panel-close"
                onClick={this.closeArtistPanel}
              >
                <img src={close} />
              </button>

              <div className="city">
                {artists.get(this.state.selectedArtists[0]).city}
              </div>

              <div className="artist-stats" style={{ margin: "36px 42px" }}>
                <span className="artist-stats-title">Streams </span>
                5.7m
                <span
                  className="artist-stats-title"
                  style={{ marginLeft: "60px" }}
                >
                  Downloads{" "}
                </span>
                23.4k
              </div>
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#DDE1E4"
                }}
              />

              <ArtistsList
                artists={this.state.selectedArtists.map(id => artists.get(id))}
              />
            </div>
          )}
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
                <img
                  src={facebook}
                  onClick={() =>
                    this.state.selectedArtist.facebook &&
                    window.open(this.state.selectedArtist.facebook)}
                />
                <img
                  src={twitter}
                  onClick={() =>
                    this.state.selectedArtist.twitter &&
                    window.open(this.state.selectedArtist.twitter)}
                />
                <img
                  src={soundcloud}
                  onClick={() =>
                    this.state.selectedArtist.soundcloud &&
                    window.open(this.state.selectedArtist.soundcloud)}
                />
                <img
                  src={youtube}
                  onClick={() =>
                    this.state.selectedArtist.youtube &&
                    window.open(this.state.selectedArtist.youtube)}
                />
              </div>
              <div className="artist-info">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <div className="artist-info-name">
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
                  <span className="artist-stats-title">Streams </span>
                  {this.state.selectedArtist.streams}
                  <span
                    className="artist-stats-title"
                    style={{ marginLeft: "10px" }}
                  >
                    Downloads {" "}
                  </span>
                  {this.state.selectedArtist.downloads}
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
        <Map
          style="mapbox://styles/gsalles/cj9w0uuyk5bth2skpo4j01oyl"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={getCenter(this.state)}
          zoom={[3]}
        >
          <Cluster ClusterMarkerFactory={this.clusterMarker}>
            {artistsArray.map(this._renderArtistMarker)}
          </Cluster>
        </Map>
      </div>
    );
  }
}

export default App;
